
/******************************************************************************
* Author		: Md. Meher Dewan
* Date			: 29 December 2019
* Description	: Loan Document Mapping Selection for LMS
******************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME			{SEL_loan_config};
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
	_NSMART_SP_SEL_HEADER

		SELECT  tx_rs_type = 'RS_TYPE_LOAN_CONFIG'
				, _PRIMARY_KEY
				, _VERSION

				, _TABLE_HEADER_INS_FIELD_WITH_STATE

				, LCG.id_loan_type_key
				, LCG.id_customer_type_key
				, LCG.dec_interest_rate

		FROM		T_LOAN_CONFIG		LCG
		WHERE		_PRIMARY_KEY 			= ISNULL(@_PRIMARY_KEY,			_PRIMARY_KEY)
		AND 		id_loan_type_key		= ISNULL(@id_loan_type_key		, id_loan_type_key)
		AND 		id_customer_type_key	= ISNULL(@id_customer_type_key	, id_customer_type_key)
		AND 		dec_interest_rate		= ISNULL(@dec_interest_rate		, dec_interest_rate)
		AND			is_active 				= 1

		ORDER		BY	LCG.id_loan_config_key ASC
	
	_SP_FOOTER

}
go

_GRANT_PERM_SP
