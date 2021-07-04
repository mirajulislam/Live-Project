
/******************************************************************************
* Author		: MMd. Kamruzzaman
* Date			: 29 December 2019
* Description	: 
******************************************************************************/
#include <nSMART_SQL.h>
#define _TABLE_NAME 		{T_COMMENT};
#define _PRIMARY_KEY		{id_comment_key};
#define _VERSION			{id_comment_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME)

(
	  _PRIMARY_KEY					int		identity(100000, 1)         NOT NULL
	, _VERSION						int									NOT NULL
	, _TABLE_HEADER_WITH_STATE
	, tx_object_type				varchar(64)							NULL
	, tx_comment_type				varchar(64)							NULL
	, id_ref_key					int									NULL								 
	, tx_comment					varchar(MAX)						NULL
	, dtt_created_date				datetime							NULL
	, tx_commented_by				varchar(128)						NULL
	, tx_comment_response			varchar(MAX)						NULL
	, tx_comment_response_by		varchar(128)						NULL
	
	, CONSTRAINT pk_comment_key PRIMARY KEY CLUSTERED (_PRIMARY_KEY)
)
go

_GRANT_PERM_TBL