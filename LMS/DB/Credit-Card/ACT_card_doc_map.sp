
/******************************************************************************
* Author		: Kh. Assaduzzaman Sohan
* Date			: 05 Aug 2021
* Description	: Loan Document Mapping Action for LMS
******************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME			{ACT_card_doc_map};
#define _TABLE_NAME 		{T_CARD_DOC_MAP};
#define _PRIMARY_KEY		{id_card_doc_map_key};
#define _VERSION			{id_card_doc_map_ver};


_DROP_PROC(_SP_NAME)

_CREATE_PROC(_SP_NAME)
	 _SP_PARAM_HEADER

	, @_PRIMARY_KEY					int						= NULL		OUTPUT
	, @_VERSION						int						= NULL		OUTPUT

	, @id_card_config_key			int						= NULL 		OUTPUT
	, @id_doc_key					int						= NULL 		OUTPUT
	, @is_mandatory					int						= NULL 		OUTPUT

	_SP_PARAM_FOOTER

AS
{
	_SP_HEADER

	---- Check action name -------

	SELECT @g_tx_err_msg = 'ACTION : ' + @tx_action_name
	_LOG_INFO(@g_tx_err_msg)

	IF @tx_action_name NOT IN (_ACTION_NEW , _ACTION_UPDATE, _ACTION_SELECT, 'SELECT_DOC_MAP' )
	{
		SELECT @g_tx_err_msg = _GEM_ACTION + ISNULL(@tx_action_name, _DB_NULL_STR)
		_HANDLE_ERROR(_GEC_ACTION, @g_tx_err_msg)
	}
	
	IF (_ACTION(_ACTION_NEW))
	{
		INSERT INTO _TABLE_NAME
		(	
			 _VERSION					
			, _TABLE_HEADER_INS_FIELD_WITH_STATE
			, id_card_config_key
			, id_doc_key
			, is_mandatory	
		)
		VALUES
		(
			0
			, _TABLE_HEADER_INS_VAL_WITH_STATE
			, ISNULL(@id_card_config_key 					, 0)
			, ISNULL(@id_doc_key 							, 0)
			, ISNULL(@is_mandatory							, 0)
		)
	}

	IF (_ACTION(_ACTION_DELETE))
	{
		SELECT @tx_action_name = _ACTION_UPDATE, @is_active = 0
	}

	IF (_ACTION(_ACTION_UPDATE))
	{
		
		_CHECK_NULL_INT(@_PRIMARY_KEY)
			
		UPDATE	_TABLE_NAME
		SET	_VERSION					= _VERSION + 1  
			, _TABLE_HEADER_UPD
			, id_card_config_key 		= ISNULL(@id_card_config_key, 		id_card_config_key)
			, id_doc_key 				= ISNULL(@id_doc_key, 				id_doc_key)
			, is_mandatory 				= ISNULL(@is_mandatory,				is_mandatory)
		WHERE	_PRIMARY_KEY	= @_PRIMARY_KEY

		_RETURN_IF_SP_ERROR(UPD_loan_doc_map)
	}
	IF @tx_action_name IN (_ACTION_SELECT)
	{
	
		SELECT  tx_rs_type = 'RS_TYPE_CARD_DOC_MAP'
				, *
		FROM		T_CARD_DOC_MAP	LDM
		WHERE		_PRIMARY_KEY 			= ISNULL(@_PRIMARY_KEY,			_PRIMARY_KEY)
		AND 		id_card_config_key		= ISNULL(@id_card_config_key	, id_card_config_key)
		AND 		id_doc_key				= ISNULL(@id_doc_key			, id_doc_key)
		AND 		is_mandatory			= ISNULL(@is_mandatory			, is_mandatory)
		AND			is_active 				= 1

		ORDER		BY	LDM.id_card_doc_map_key ASC

		_RETURN_IF_SP_ERROR(SEL_loan_doc_map)
	}
	IF @tx_action_name IN ('SELECT_DOC_MAP')
	{
		SELECT tx_rs_type = 'RS_TYPE_CARD_DOC_MAP'
		, LDM.id_card_doc_map_key
		, LDM.id_card_doc_map_ver
		, LDM.id_user_mod_key
		, LDM.dtt_mod
		, LDM.id_doc_key
		, LDM.id_card_config_key
		, C.tx_value1 tx_doc_type
		, CASE	WHEN C.tx_value2 = 'true'	THEN 1 
				WHEN C.tx_value2 = 'false'	THEN 0 
				END is_deafult
		,  CASE	WHEN C.tx_value3 = 'true'	THEN 1 
				WHEN C.tx_value3 = 'false'	THEN 0 
				END is_mandatory_for_all_cards
		, LDM.is_mandatory
		, LDM.is_active
		FROM T_CARD_DOC_MAP LDM
		JOIN  T_CARD_CONFIG		LC  ON LC.id_card_config_key	= LDM.id_card_config_key
		JOIN T_CONFIGURATION	C	ON C.id_configuration_key	= LDM.id_doc_key
		WHERE C.is_active				= 1
		AND LDM.id_card_config_key		=  @id_card_config_key
	}


	_SP_FOOTER
}
go

_GRANT_PERM_SP