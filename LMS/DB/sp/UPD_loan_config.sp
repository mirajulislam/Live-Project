
/******************************************************************************
* Author		: Md. Meher Dewan
* Date			: 29 December 2019
* Description	: Loan Configuration Update for LMS
******************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME			{UPD_loan_config};
#define _TABLE_NAME 		{T_LOAN_CONFIG};
#define _PRIMARY_KEY		{id_loan_config_key};
#define _VERSION			{id_loan_config_ver};


_DROP_PROC

_CREATE_PROC (_SP_NAME)

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


		UPDATE	_TABLE_NAME
		SET		  _VERSION					= _VERSION + 1  
				, _TABLE_HEADER_UPD
				
				, id_loan_type_key 			= ISNULL(@id_loan_type_key, 		id_loan_type_key)
				, id_customer_type_key 		= ISNULL(@id_customer_type_key, 	id_customer_type_key)
				, dec_interest_rate 		= ISNULL(@dec_interest_rate,		dec_interest_rate)
				
		WHERE	_PRIMARY_KEY	= @_PRIMARY_KEY
		--AND		_VERSION		= @_VERSION

		_STORE_SYS_VARS
		SELECT @g_tx_err_msg = _GEM_UPDATE(_TABLE_NAME, @_PRIMARY_KEY)
		_HANDLE_ZERO_ROW_COUNT(_GEC_SELECT, @g_tx_err_msg)

		_UPDATE_VER(@_VERSION)

		_TOUCHED_TABLE(_TABLE_NAME)

	

	_SP_FOOTER
}
go

_GRANT_PERM_SP

