/******************************************************************************
* Author		: Md. Meher Dewan
* Date			: 29 December 2019
* Description	: Loan Configuration Action for LMS
******************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME			{ACT_loan_config};
#define _TABLE_NAME 		{T_LOAN_CONFIG};
#define _PRIMARY_KEY		{id_loan_config_key};
#define _VERSION			{id_loan_config_ver};


_DROP_PROC(_SP_NAME)

_CREATE_PROC(_SP_NAME)
	 _SP_PARAM_HEADER

	, @_PRIMARY_KEY					int						= NULL		OUTPUT
	, @_VERSION						int						= NULL		OUTPUT

	, @id_loan_type_key				int						= NULL 		OUTPUT
	, @id_customer_type_key			int						= NULL 		OUTPUT
	, @dec_interest_rate			DECIMAL(18, 2)			= NULL 		OUTPUT

	_SP_PARAM_FOOTER

AS
{
	_SP_HEADER

	---- Check action name -------

	SELECT @g_tx_err_msg = 'ACTION : ' + @tx_action_name
	_LOG_INFO(@g_tx_err_msg)

	IF @tx_action_name NOT IN (_ACTION_NEW , _ACTION_UPDATE, _ACTION_SELECT, 'SELECT_LOAN_PERCENT', 'SELECT_LOAN_CONFIG' )
	{
		SELECT @g_tx_err_msg = _GEM_ACTION + ISNULL(@tx_action_name, _DB_NULL_STR)
		_HANDLE_ERROR(_GEC_ACTION, @g_tx_err_msg)
	}
	
	IF (_ACTION(_ACTION_NEW))
	{
		_GENERATE_EVENT_KEY

		_BEGIN_TRAN

			EXEC @g_id_return_status = INS_loan_config
				  _SP_ARGS_HEADER
				, @_PRIMARY_KEY					= @_PRIMARY_KEY						OUTPUT	
				, @_VERSION						= @_VERSION							OUTPUT			
				
				, @id_loan_type_key    			= @id_loan_type_key  				OUTPUT
				, @id_customer_type_key    		= @id_customer_type_key  			OUTPUT
				, @dec_interest_rate    		= @dec_interest_rate  				OUTPUT
				
				
			_RETURN_IF_SP_ERROR(INS_loan_config)
			
		_COMMIT_TRAN
	}

	IF (_ACTION(_ACTION_DELETE))
	{
		SELECT @tx_action_name = _ACTION_UPDATE, @is_active = 0
	}

	IF (_ACTION(_ACTION_UPDATE))
	{
		
		_CHECK_NULL_INT(@_PRIMARY_KEY)

			
			EXEC @g_id_return_status = UPD_loan_config
				  _SP_ARGS_HEADER
				, @_PRIMARY_KEY					= @_PRIMARY_KEY						OUTPUT	
				, @_VERSION						= @_VERSION							OUTPUT			
				
				, @id_loan_type_key    			= @id_loan_type_key  				OUTPUT
				, @id_customer_type_key    		= @id_customer_type_key  			OUTPUT
				, @dec_interest_rate    		= @dec_interest_rate  				OUTPUT

			_RETURN_IF_SP_ERROR(UPD_loan_config)
			
		

	}
	IF @tx_action_name IN (_ACTION_SELECT)
	{
			
			EXEC @g_id_return_status = SEL_loan_config
		 		  _SP_ARGS_HEADER
				, @_PRIMARY_KEY					= @_PRIMARY_KEY						OUTPUT	
				, @_VERSION						= @_VERSION							OUTPUT			
				
				, @id_loan_type_key    			= @id_loan_type_key  				OUTPUT
				, @id_customer_type_key    		= @id_customer_type_key  			OUTPUT
				, @dec_interest_rate    		= @dec_interest_rate  				OUTPUT

			_RETURN_IF_SP_ERROR(SEL_loan_config)

		
	}

	IF @tx_action_name IN ('SELECT_LOAN_PERCENT')
	{
		/*DECLARE @l_loan_percnt DECIMAL(18, 2)

		SELECT @l_loan_percnt = dec_interest_rate 
		FROM T_LOAN_CONFIG
		WHERE is_active = 1
		AND id_loan_type_key    	= @id_loan_type_key  				
		AND id_customer_type_key    = @id_customer_type_key 
		
		IF (@l_loan_percnt NOT IN (NULL, -2147483648.00))
		{
			SELECT tx_rs_type	= 'RS_TYPE_LOAN_CONFIG'
			, dec_interest_rate = @l_loan_percnt	
		}
		ELSE
		{
			SELECT tx_rs_type	= 'RS_TYPE_LOAN_CONFIG'
			, dec_interest_rate	= tx_value2
			FROM T_CONFIGURATION 
			WHERE id_configuration_key = @id_loan_type_key
		}*/

		SELECT tx_rs_type = 'RS_TYPE_LOAN_CONFIG'
		, CASE WHEN LC.dec_interest_rate IN (NULL, -2147483648) THEN LT.tx_value2
			ELSE LC.dec_interest_rate END AS dec_interest_rate
		FROM T_LOAN_CONFIG LC
		JOIN T_CONFIGURATION LT ON LT.id_configuration_key = LC.id_loan_type_key
		WHERE LC.is_active			= 1
		AND LT.is_active			= 1
		AND LC.id_loan_type_key		= @id_loan_type_key  
		AND LC.id_customer_type_key = @id_customer_type_key		
	}

	IF @tx_action_name IN ('SELECT_LOAN_CONFIG'){
		SELECT tx_rs_type = 'RS_TYPE_LOAN_CONFIG'
		, LC.id_loan_config_key
		, LC.id_loan_type_key
		, LC.id_customer_type_key
		, LT.tx_value1 tx_loan_type
		, CT.tx_value1 tx_customer_type
		, LT.tx_value2 dec_default_interest_rate
		, CASE WHEN LC.dec_interest_rate IN (NULL, -2147483648) THEN 0 
			ELSE LC.dec_interest_rate END AS dec_interest_rate
		FROM T_LOAN_CONFIG LC
		JOIN T_CONFIGURATION LT ON LT.id_configuration_key = LC.id_loan_type_key
		JOIN T_CONFIGURATION CT ON CT.id_configuration_key = LC.id_customer_type_key
		WHERE LC.is_active			= 1
		AND CT.is_active			= 1
		AND LT.is_active			= 1
		AND LC.id_loan_type_key		= ISNULL(@id_loan_type_key, LC.id_loan_type_key)
		AND LC.id_customer_type_key = ISNULL(@id_customer_type_key, LC.id_customer_type_key)
		ORDER BY LC.id_loan_type_key
	}

	_SP_FOOTER
}
go

_GRANT_PERM_SP