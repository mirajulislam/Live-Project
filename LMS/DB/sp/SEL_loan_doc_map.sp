
/******************************************************************************
* Author		: Md. Meher Dewan
* Date			: 29 December 2019
* Description	: Loan Document Mapping Selection for LMS
******************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME			{SEL_loan_doc_map};
#define _TABLE_NAME 		{T_LOAN_DOC_MAP};
#define _PRIMARY_KEY		{id_loan_doc_map_key};
#define _VERSION			{id_loan_doc_map_ver};


_DROP_PROC

_CREATE_PROC (_SP_NAME)

	 _SP_PARAM_HEADER

	, @_PRIMARY_KEY					int						= NULL		OUTPUT
	, @_VERSION						int						= NULL		OUTPUT

	, @id_loan_config_key			int						= NULL 		OUTPUT
	, @id_doc_key					int						= NULL 		OUTPUT
	, @is_mandatory					int						= NULL 		OUTPUT

	_SP_PARAM_FOOTER

AS
{
	_NSMART_SP_SEL_HEADER

		SELECT  tx_rs_type = 'RS_TYPE_LOAN_DOC_MAP'
				, _PRIMARY_KEY
				, _VERSION

				, _TABLE_HEADER_INS_FIELD_WITH_STATE

				, LDM.id_loan_config_key
				, LDM.id_doc_key
				, LDM.is_mandatory

		FROM		T_LOAN_DOC_MAP	LDM
		WHERE		_PRIMARY_KEY 			= ISNULL(@_PRIMARY_KEY,			_PRIMARY_KEY)
		AND 		id_loan_config_key		= ISNULL(@id_loan_config_key	, id_loan_config_key)
		AND 		id_doc_key				= ISNULL(@id_doc_key			, id_doc_key)
		AND 		is_mandatory			= ISNULL(@is_mandatory			, is_mandatory)
		AND			is_active 				= 1

		ORDER		BY	LDM.id_loan_doc_map_key ASC
	
	_SP_FOOTER

}
go

_GRANT_PERM_SP
