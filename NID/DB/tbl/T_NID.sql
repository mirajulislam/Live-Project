/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Fahim Reza & Kh. Assaduzzaman Sohan
* Date          : 5 DEC 2019
* Description   : Table for NID information
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_NID};
#define _PRIMARY_KEY		{id_nid_key};
#define _VERSION			{id_nid_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	  _PRIMARY_KEY					  INT	IDENTITY(100000,1)		NOT NULL
	, _VERSION					  	  INT						    NOT NULL
	, _TABLE_HEADER_WITH_STATE

    , id_nid_request_key			  INT                    		NOT NULL
    , tx_nid						  VARCHAR(16)                   NOT NULL
    , dtt_dob                         DATETIME                      NOT NULL
    , tx_father_name                  NVARCHAR(128)                  NOT NULL
    , tx_mother_name                  NVARCHAR(128)                  NOT NULL
    , tx_blood_group				  NVARCHAR(4)                    NOT NULL
    , tx_addr_line_1				  NVARCHAR(128)                  NOT NULL
	, tx_addr_line_2				  NVARCHAR(128)                  NOT NULL
	, tx_name						  NVARCHAR(128)					NOT NULL
	, tx_post_office				  NVARCHAR(128)					NOT NULL
	, int_post_code					  INT							NOT NULL
	, tx_police_station				  NVARCHAR(64)					NOT NULL
	, tx_district					  NVARCHAR(64)					NOT NULL
	, tx_division					  NVARCHAR(64)					NOT NULL
	, dtt_nid_issue_date			  DATETIME                      NOT NULL
	, dtt_extract_time				  DATETIME						NOT NULL
	, int_nid_source				  INT 							NOT NULL 	
	, dtt_request					  DATETIME						NOT NULL
	, dtt_response					  DATETIME						NOT NULL
	, int_match_percentage			  INT							NOT NULL
	, tx_nid_image_path 			  VARCHAR(256)					NOT NULL
	, tx_nid_image_name				  VARCHAR(128)					NOT NULL
	, tx_nid_person_image_path 		  VARCHAR(256)					NOT NULL
	, tx_nid_person_image_name		  VARCHAR(128)					NOT NULL
	, int_success					  INT 							NOT NULL

    , CONSTRAINT pk_id_nid_key PRIMARY KEY CLUSTERED(_PRIMARY_KEY)

)

go

CREATE UNIQUE INDEX idx_tx_nid
	ON T_NID(tx_nid, dtt_dob)
go

_GRANT_PERM_TBL