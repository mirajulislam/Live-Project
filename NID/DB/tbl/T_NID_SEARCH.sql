/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islam
* Date          : 21 March 2022
* Description   : Table for NID search information
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_NID_SEARCH};
#define _PRIMARY_KEY		{id_nid_search_key};
#define _VERSION			{id_nid_search_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	  _PRIMARY_KEY					  INT	IDENTITY(100000,1)		NOT NULL
	, _VERSION					  	  INT						    NOT NULL
	, _TABLE_HEADER_WITH_STATE

    , tx_nid						  VARCHAR(16)                   NOT NULL
    , dtt_dob                         DATETIME                      NOT NULL
    , tx_father_name                  NVARCHAR(128)                 NOT NULL
    , tx_data_source                  NVARCHAR(128)                 NOT NULL
    , tx_name				  		  NVARCHAR(4)                   NOT NULL
    , tx_force_fatch				  NVARCHAR(128)                 NOT NULL
    , dtt_request                     DATETIME                      NOT NULL

    , CONSTRAINT pk_id_nid_search_key PRIMARY KEY CLUSTERED(_PRIMARY_KEY)

)

go

CREATE UNIQUE INDEX id_Xnid_search_key
	ON T_NID_SEARCH(tx_nid, dtt_dob)
go

_GRANT_PERM_TBL