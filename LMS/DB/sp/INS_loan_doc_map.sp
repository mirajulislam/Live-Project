
/******************************************************************************
* Author		: Md. Meher Dewan
* Date			: 29 December 2019
* Description	: Loan Document Mapping Insertion for LMS
******************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME			{INS_loan_doc_map};
#define _TABLE_NAME 		{T_LOAN_DOC_MAP};
#define _PRIMARY_KEY		{id_loan_doc_map_key};
#define _VERSION			{id_loan_doc_map_ver};


_DROP_PROC

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
	


		INSERT INTO _TABLE_NAME
		(
						
			 _VERSION					
			, _TABLE_HEADER_INS_FIELD_WITH_STATE
			, id_loan_config_key
			, id_doc_key
			, is_mandatory
				
		)
		VALUES
		(
			--@_PRIMARY_KEY
			ISNULL(@_VERSION 								, 0)
			, _TABLE_HEADER_INS_VAL_WITH_STATE
			, ISNULL(@id_loan_config_key 					, 0)
			, ISNULL(@id_doc_key 							, 0)
			, ISNULL(@is_mandatory							, 0)
		)

		_STORE_SYS_VARS		
		SELECT @g_tx_err_msg = _GEM_INSERT(_TABLE_NAME, @id_loan_config_key)
		_HANDLE_ZERO_ROW_COUNT(_GEC_INSERT, @g_tx_err_msg)

		_TOUCHED_TABLE(_TABLE_NAME)

	

	_SP_FOOTER

	RETURN _STATUS_OK
}
go

_GRANT_PERM_SP
