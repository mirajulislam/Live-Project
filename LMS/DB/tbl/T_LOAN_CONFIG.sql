
/******************************************************************************
* Author		: Md. Meher Dewan
* Date			: 29 December 2019
* Description	: Loan Configuration for LMS
******************************************************************************/
#include <nSMART_SQL.h>
#define _TABLE_NAME 		{dbo.T_LOAN_CONFIG};
#define _PRIMARY_KEY		{id_loan_config_key};
#define _VERSION			{id_loan_config_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME)

(
	  _PRIMARY_KEY					int		identity(100000, 1)         NOT NULL
	, _VERSION						int									NOT NULL
	, _TABLE_HEADER_WITH_STATE
	, id_loan_type_key				int									NULL
	, id_customer_type_key			int									NULL								 
	, dec_interest_rate				DECIMAL(18, 2)						NULL
	
	, CONSTRAINT id_loan_config_key PRIMARY KEY CLUSTERED (_PRIMARY_KEY)
)
go

CREATE UNIQUE INDEX id_loan_config_key
	ON dbo.T_LOAN_CONFIG(id_loan_type_key, id_customer_type_key, dec_interest_rate)
go


_GRANT_PERM_TBL