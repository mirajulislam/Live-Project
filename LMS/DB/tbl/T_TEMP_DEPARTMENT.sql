
/******************************************************************************
* Author		: Md. Meher Dewan
* Date			: 04 June 2020
* Description	: 
******************************************************************************/
#include <nSMART_SQL.h>
#define _TABLE_NAME 		{T_TEMP_DEPARTMENT};
#define _PRIMARY_KEY		{id_dept_key};
#define _VERSION			{id_dept_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME)

(
	  _PRIMARY_KEY					int		identity(100000, 1)         NOT NULL
	, _VERSION						int									NOT NULL
	, _TABLE_HEADER_WITH_STATE
	, tx_dept_name					varchar(64)							NULL
	, tx_desc						varchar(32)							NULL
	
	, CONSTRAINT pk_id_dept_key PRIMARY KEY CLUSTERED (_PRIMARY_KEY)
)
go

_GRANT_PERM_TBL