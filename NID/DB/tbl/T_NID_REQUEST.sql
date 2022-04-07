/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 8 DEC 2019
* Description   : We can use JPA for this table, This table will use to get NID easily.
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_NID_REQUEST};
#define _PRIMARY_KEY		{id_nid_request_key};
#define _VERSION			{id_nid_request_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	  _PRIMARY_KEY					INT	IDENTITY(100000,1)	NOT NULL
	, _VERSION					  	INT						NOT NULL
	, _TABLE_HEADER_WITH_STATE

    , id_nid_key                    INT                     NOT NULL
    
    , dtt_request					DATETIME                NOT NULL
    , dtt_response                  DATETIME                NOT NULL

    , is_valid_req                  INT                 	NOT NULL	-- 1=valid, 0=invalid
    , int_data_source	            INT                 	NOT NULL	-- [1 = local cache, 2 = nid server , ...]
    , is_success_req				INT                 	NOT NULL	-- If we found NId either local cache or nid server than it is success[1], else fail[0]
    , int_match_percentage 			INT                 	NOT NULL

	, tx_comments 				    VARCHAR(512)            NOT NULL
    , tx_call_back_url              VARCHAR(128)            NOT NULL

    , CONSTRAINT pk_id_nid_request_key PRIMARY KEY CLUSTERED(_PRIMARY_KEY)
)

go

_GRANT_PERM_TBL