
/******************************************************************************
* Author		: MMd. Kamruzzaman
* Date			: 29 December 2019
* Description	: 
******************************************************************************/
#include <nSMART_SQL.h>
#define _TABLE_NAME 		{T_ROLE_STATE_MAP};
#define _PRIMARY_KEY		{id_role_state_map_key};
#define _VERSION			{id_role_state_map_ver};

_DROP_TABLE
_CREATE_TABLE(_TABLE_NAME)

(
	  _PRIMARY_KEY					int		identity(100000, 1)         NOT NULL
	, _VERSION						int									NOT NULL
	, _TABLE_HEADER
	, id_role_key					int									NOT NULL
	, id_fsm_state_key 				int									NOT NULL
	, int_permission 				int									NOT NULL
	, tx_comment					varchar(512)						NOT NULL
	
	, CONSTRAINT pk_role_state_map_key PRIMARY KEY CLUSTERED (_PRIMARY_KEY)
)
go

CREATE UNIQUE INDEX idx_role_state_map
	ON dbo.T_ROLE_STATE_MAP(id_role_key, id_fsm_state_key, is_active)
go

_GRANT_PERM_TBL