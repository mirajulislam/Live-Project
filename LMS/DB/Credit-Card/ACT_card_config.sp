/******************************************************************************
* Author		: Kh. Assaduzzaman Sohan
* Date			: 05 Aug 2021
* Description	: Credit Card Configuration Action for LMS
******************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME			{ACT_card_config};
#define _TABLE_NAME 		{T_CARD_CONFIG};
#define _PRIMARY_KEY		{id_card_config_key};
#define _VERSION			{id_card_config_ver};


_DROP_PROC(_SP_NAME)

_CREATE_PROC(_SP_NAME)
	 _SP_PARAM_HEADER

	, @_PRIMARY_KEY					int						= NULL		OUTPUT
	, @_VERSION						int						= NULL		OUTPUT

	, @id_card_type_key				int						= NULL 		OUTPUT
	, @id_customer_type_key			int						= NULL 		OUTPUT
	, @dec_interest_rate			DECIMAL(18, 2)			= NULL 		OUTPUT

	_SP_PARAM_FOOTER

AS
{
	_SP_HEADER

	---- Check action name -------

	SELECT @g_tx_err_msg = 'ACTION : ' + @tx_action_name
	_LOG_INFO(@g_tx_err_msg)

	IF @tx_action_name NOT IN (_ACTION_NEW , _ACTION_UPDATE, _ACTION_SELECT , 'SELECT_CARD_CONFIG','SELECT_CARD_PERCENT')
	{
		SELECT @g_tx_err_msg = _GEM_ACTION + ISNULL(@tx_action_name, _DB_NULL_STR)
		_HANDLE_ERROR(_GEC_ACTION, @g_tx_err_msg)
	}
	
	IF (_ACTION(_ACTION_NEW))
	{
		_GENERATE_EVENT_KEY

		_BEGIN_TRAN

		INSERT INTO _TABLE_NAME
		(
			 _VERSION					
			, _TABLE_HEADER_INS_FIELD_WITH_STATE
			, id_card_type_key
			, id_customer_type_key
			, dec_interest_rate
				
		)
		VALUES
		(
			0
			, _TABLE_HEADER_INS_VAL_WITH_STATE
			, ISNULL(@id_card_type_key 					, 0)
			, ISNULL(@id_customer_type_key 				, 0)
			, ISNULL(@dec_interest_rate					, _DB_NULL_INT)
		)

		_STORE_SYS_VARS		
		SELECT @g_tx_err_msg = _GEM_INSERT(_TABLE_NAME, @_PRIMARY_KEY)
		_HANDLE_ZERO_ROW_COUNT(_GEC_INSERT, @g_tx_err_msg)

		_TOUCHED_TABLE(_TABLE_NAME)
			
		_COMMIT_TRAN
	}

	IF (_ACTION(_ACTION_DELETE))
	{
		SELECT @tx_action_name = _ACTION_UPDATE, @is_active = 0
	}

	IF (_ACTION(_ACTION_UPDATE))
	{
		
		_CHECK_NULL_INT(@_PRIMARY_KEY)

			
		UPDATE	_TABLE_NAME
		SET		  _VERSION					= _VERSION + 1  
				, _TABLE_HEADER_UPD
				, id_card_type_key 			= ISNULL(@id_card_type_key, 		id_card_type_key)
				, id_customer_type_key 		= ISNULL(@id_customer_type_key, 	id_customer_type_key)
				, dec_interest_rate 		= ISNULL(@dec_interest_rate,		dec_interest_rate)
				
		WHERE	_PRIMARY_KEY	= @_PRIMARY_KEY

		_STORE_SYS_VARS
		SELECT @g_tx_err_msg = _GEM_UPDATE(_TABLE_NAME, @_PRIMARY_KEY)
		_HANDLE_ZERO_ROW_COUNT(_GEC_SELECT, @g_tx_err_msg)

		_UPDATE_VER(@_VERSION)

		_TOUCHED_TABLE(_TABLE_NAME)
	}
	IF @tx_action_name IN (_ACTION_SELECT)
	{
		SELECT  tx_rs_type = 'RS_TYPE_CARD_CONFIG'
		, *
		FROM		_TABLE_NAME		
		WHERE		_PRIMARY_KEY 			= ISNULL(@_PRIMARY_KEY,			_PRIMARY_KEY)
		AND 		id_card_type_key		= ISNULL(@id_card_type_key		, id_card_type_key)
		AND 		id_customer_type_key	= ISNULL(@id_customer_type_key	, id_customer_type_key)
		AND 		dec_interest_rate		= ISNULL(@dec_interest_rate		, dec_interest_rate)
		AND			is_active 				= 1
		ORDER BY	id_card_config_key ASC
	}

	IF @tx_action_name IN ('SELECT_CARD_CONFIG')
	{
		SELECT tx_rs_type = 'RS_TYPE_CARD_CONFIG'
		, LC.id_card_config_key
		, LC.id_card_type_key
		, LC.id_customer_type_key
		, LT.tx_value1 tx_card_type
		, CT.tx_value1 tx_customer_type
		, LT.tx_value2 dec_default_interest_rate
		, CASE WHEN LC.dec_interest_rate IN (NULL, -2147483648) THEN 0 
			ELSE LC.dec_interest_rate END AS dec_interest_rate
		FROM T_CARD_CONFIG LC
		JOIN T_CONFIGURATION LT ON LT.id_configuration_key = LC.id_card_type_key
		JOIN T_CONFIGURATION CT ON CT.id_configuration_key = LC.id_customer_type_key
		WHERE LC.is_active			= 1
		AND CT.is_active			= 1
		AND LT.is_active			= 1
		AND LC.id_card_type_key		= ISNULL(@id_card_type_key, LC.id_card_type_key)
		AND LC.id_customer_type_key = ISNULL(@id_customer_type_key, LC.id_customer_type_key)
		ORDER BY LC.id_card_type_key
	}

	IF @tx_action_name IN ('SELECT_CARD_PERCENT')
	{		

		SELECT tx_rs_type = 'RS_TYPE_CARD_CONFIG'
		, CASE WHEN LC.dec_interest_rate IN (NULL, -2147483648) THEN LT.tx_value2
			ELSE LC.dec_interest_rate END AS dec_interest_rate
		FROM T_CARD_CONFIG LC
		JOIN T_CONFIGURATION LT ON LT.id_configuration_key = LC.id_card_type_key
		WHERE LC.is_active			= 1
		AND LT.is_active			= 1
		AND LC.id_card_type_key		= @id_card_type_key 
		AND LC.id_customer_type_key = @id_customer_type_key		
	}

	_SP_FOOTER
}
go

_GRANT_PERM_SP