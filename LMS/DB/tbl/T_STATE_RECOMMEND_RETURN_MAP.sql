
/******************************************************************************
* Author		: MMd. Kamruzzaman
* Date			: 29 December 2019
* Description	: 
******************************************************************************/
#include <nSMART_SQL.h>
#define _TABLE_NAME 		{T_STATE_RECOMMEND_RETURN_MAP};
#define _PRIMARY_KEY		{id_state_recommend_return_map_key};
#define _VERSION			{id_state_recommend_return_map_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME)

(
	  _PRIMARY_KEY					int		identity(100000, 1)         NOT NULL
	, _VERSION						int									NOT NULL
	, _TABLE_HEADER
	, id_from_role_key 				int									NOT NULL -- if user has this role
	, id_fsm_state_key 				int									NOT NULL	-- if loan is this state
	, id_role_key					int									NOT NULL	-- user can recommend / return this role
	, int_recommend 				int									NOT NULL
	, int_return 					int									NOT NULL
	, tx_comment					varchar(512)						NOT NULL

	
	, CONSTRAINT pk_state_recommend_return_map_key PRIMARY KEY CLUSTERED (_PRIMARY_KEY)
)
go

CREATE UNIQUE INDEX idx_state_recommend_return_map_key
	ON dbo.T_STATE_RECOMMEND_RETURN_MAP(id_from_role_key, id_fsm_state_key, id_role_key, is_active)
go

_GRANT_PERM_TBL

