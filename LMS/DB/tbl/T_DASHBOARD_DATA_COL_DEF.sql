/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul islam
* Date          : 20 OCT 2020
* Description   : Table for Deshboard column defination
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_DASHBOARD_DATA_COL_DEF};
#define _PRIMARY_KEY		{id_deshboard_data_col_def_key};
#define _VERSION			{id_deshboard_data_col_def_key_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	  _PRIMARY_KEY					 	INT		IDENTITY(100000,1)  NOT NULL
	, _VERSION					  	 	INT				                NOT NULL
	, _TABLE_HEADER_WITH_STATE

	 ,tx_dashboard_type                 VARCHAR(256) NOT NULL
     ,tx_col_name                       VARCHAR(256) NOT NULL 
     ,tx_col_def                        VARCHAR(256) NOT NULL
)

go

_GRANT_PERM_TBL