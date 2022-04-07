/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul islam
* Date          : 11 NOV 2021
* Description   : Table for User Document information
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_USER_DOCUMENT};
#define _PRIMARY_KEY		{id_user_doc_key};
#define _VERSION			{id_user_doc_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	  _PRIMARY_KEY					 	INT	IDENTITY(100000,1)		NOT NULL
	, _VERSION					  	 	INT						    NOT NULL
	, _TABLE_HEADER_WITH_STATE

    , id_user_key                       INT                         NOT NULL
    , id_doc_key                        INT                         NOT NULL
	, tx_doc_type   					VARCHAR(256)				NOT NULL   
    , int_upload_status                 INT                         NOT NULL   
    , tx_download_link				  	VARCHAR(256)                NOT NULL
    , int_is_mandatory					INT 						NOT NULL
    , tx_document_name   				VARCHAR(256)                NOT NULL
    , tx_document_path                  VARCHAR(256)                NOT NULL
    , int_file_present                  INT                         NOT NULL
    , CONSTRAINT pk_id_user_doc_key PRIMARY KEY CLUSTERED(_PRIMARY_KEY)
)

go

_GRANT_PERM_TBL