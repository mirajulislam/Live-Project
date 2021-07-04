
/******************************************************************************
* Author		: Md. Meher Dewan
* Date			: 29 December 2019
* Description	: Loan Configuration Insertion for LMS
******************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME			{INS_loan_config};
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


		INSERT INTO _TABLE_NAME
		(
						
			 _VERSION					
			, _TABLE_HEADER_INS_FIELD_WITH_STATE
			, id_loan_type_key
			, id_customer_type_key
			, dec_interest_rate
				
		)
		VALUES
		(
			--  @_PRIMARY_KEY
			--, ISNULL(@_VERSION  						, 0)
			0
			, _TABLE_HEADER_INS_VAL_WITH_STATE
			, ISNULL(@id_loan_type_key 					, 0)
			, ISNULL(@id_customer_type_key 				, 0)
			, ISNULL(@dec_interest_rate					, _DB_NULL_INT)
		)

		_STORE_SYS_VARS		
		SELECT @g_tx_err_msg = _GEM_INSERT(_TABLE_NAME, @_PRIMARY_KEY)
		_HANDLE_ZERO_ROW_COUNT(_GEC_INSERT, @g_tx_err_msg)

		_TOUCHED_TABLE(_TABLE_NAME)

	_SP_FOOTER

	RETURN _STATUS_OK
}
go

_GRANT_PERM_SP
