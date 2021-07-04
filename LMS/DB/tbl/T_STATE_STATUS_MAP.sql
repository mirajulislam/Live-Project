/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 12 JUNE 2020
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_STATE_STATUS_MAP};
#define _PRIMARY_KEY		{id_state_status_map_key};
#define _VERSION			{id_state_status_map_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME)

(
	  _PRIMARY_KEY					 	INT	IDENTITY(100000,1)		NOT NULL
	, _VERSION					  	 	INT						    NOT NULL
	, _TABLE_HEADER_WITH_STATE

    , id_fsm_state_key                  INT             NOT NULL
    , tx_state_name                     VARCHAR(64)     NOT NULL
    , tx_status_name                    VARCHAR(64)     NOT NULL
    , int_order_number                  INT             NOT NULL

    , CONSTRAINT pk_id_state_status_map_key PRIMARY KEY CLUSTERED(_PRIMARY_KEY)
)

go

_GRANT_PERM_TBL