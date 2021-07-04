
/******************************************************************************
* Author		: Md. Meher Dewan
* Date			: 29 December 2019
* Description	: Loan Document Mapping Action for LMS
******************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME			{ACT_loan_doc_map};
#define _TABLE_NAME 		{T_LOAN_DOC_MAP};
#define _PRIMARY_KEY		{id_loan_doc_map_key};
#define _VERSION			{id_loan_doc_map_ver};


_DROP_PROC(_SP_NAME)

_CREATE_PROC(_SP_NAME)
	 _SP_PARAM_HEADER

	, @_PRIMARY_KEY					int						= NULL		OUTPUT
	, @_VERSION						int						= NULL		OUTPUT

	, @id_loan_config_key			int						= NULL 		OUTPUT
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
		
			EXEC @g_id_return_status = INS_loan_doc_map
				  _SP_ARGS_HEADER
				, @_PRIMARY_KEY				= @_PRIMARY_KEY					OUTPUT	
				, @_VERSION					= @_VERSION						OUTPUT			
				
				, @id_loan_config_key   	= @id_loan_config_key   		OUTPUT	
				, @id_doc_key   		 	= @id_doc_key   				OUTPUT
				, @is_mandatory    			= @is_mandatory  				OUTPUT
				
				
			_RETURN_IF_SP_ERROR(INS_loan_doc_map)
			
		
	}

	IF (_ACTION(_ACTION_DELETE))
	{
		SELECT @tx_action_name = _ACTION_UPDATE, @is_active = 0
	}

	IF (_ACTION(_ACTION_UPDATE))
	{
		
		_CHECK_NULL_INT(@_PRIMARY_KEY)

			
			EXEC @g_id_return_status = UPD_loan_doc_map
				  _SP_ARGS_HEADER
				, @_PRIMARY_KEY				= @_PRIMARY_KEY					OUTPUT	
				, @_VERSION					= @_VERSION						OUTPUT			
				
				, @id_loan_config_key   	= @id_loan_config_key   		OUTPUT	
				, @id_doc_key   		 	= @id_doc_key   				OUTPUT
				, @is_mandatory    			= @is_mandatory  				OUTPUT

			_RETURN_IF_SP_ERROR(UPD_loan_doc_map)
			
		

	}
	IF @tx_action_name IN (_ACTION_SELECT)
	{
	
			EXEC @g_id_return_status = SEL_loan_doc_map
		 		  _SP_ARGS_HEADER
				, @_PRIMARY_KEY				= @_PRIMARY_KEY					OUTPUT	
				, @_VERSION					= @_VERSION						OUTPUT			
				
				, @id_loan_config_key   	= @id_loan_config_key   		OUTPUT	
				, @id_doc_key   		 	= @id_doc_key   				OUTPUT
				, @is_mandatory    			= @is_mandatory  				OUTPUT

			_RETURN_IF_SP_ERROR(SEL_loan_doc_map)
	}
	IF @tx_action_name IN ('SELECT_DOC_MAP')
	{
		SELECT tx_rs_type = 'RS_TYPE_LOAN_DOC_MAP'
		, LDM.id_loan_doc_map_key
		, LDM.id_loan_doc_map_ver
		, LDM.id_user_mod_key
		, LDM.dtt_mod
		, LDM.id_doc_key
		, LDM.id_loan_config_key
		, C.tx_value1 tx_doc_type
		, CASE	WHEN C.tx_value2 = 'true'	THEN 1 
				WHEN C.tx_value2 = 'false'	THEN 0 
				END is_deafult
		,  CASE	WHEN C.tx_value3 = 'true'	THEN 1 
				WHEN C.tx_value3 = 'false'	THEN 0 
				END is_mandatory_for_all_loans
		, LDM.is_mandatory
		, LDM.is_active
		FROM T_LOAN_DOC_MAP LDM
		JOIN  T_LOAN_CONFIG		LC  ON LC.id_loan_config_key	= LDM.id_loan_config_key
		JOIN T_CONFIGURATION	C	ON C.id_configuration_key	= LDM.id_doc_key
								--AND C.tx_group				= 'DOCUMENT'
		WHERE C.is_active				= 1
		--AND LDM.is_active				= ISNULL(@is_active, LDM.is_active)
		AND LDM.id_loan_config_key		=  @id_loan_config_key
	}


	_SP_FOOTER
}
go

_GRANT_PERM_SP