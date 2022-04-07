/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islam
* Date          : 11 NOV 2021
* Description   : Table for Customer Branch 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_CUSTOMER_BRANCH};
#define _PRIMARY_KEY		{id_customer_branch_key};
#define _VERSION			{id_customer_branch_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	 	_PRIMARY_KEY					 	INT	IDENTITY(100000,1)		NOT NULL
	,	_VERSION					  	 	INT						    NOT NULL
	,	_TABLE_HEADER_WITH_STATE

	,	int_branch_id						INT                         NOT NULL
	,	tx_branch_name                  	VARCHAR(256)   				NOT NULL
)

go

_GRANT_PERM_TBL