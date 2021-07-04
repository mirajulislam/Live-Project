
/******************************************************************************
* Author		: Mirajul Islam
* Date			: 26 May 2021
* Description	: 
******************************************************************************/
#include <nSMART_SQL.h>
#define _TABLE_NAME 		{T_NOTES};
#define _PRIMARY_KEY		{id_notes_key};
#define _VERSION			{id_notes_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME)

(
	  __PRIMARY_KEY					int		identity(100000, 1)         NOT NULL
	, _VERSION						int									NOT NULL
	, _TABLE_HEADER_WITH_STATE
	, id_creator_key                     INT             NOT NULL
    , dtt_create                         DATETIME        NOT NULL
	, id_ref_key					int									NULL								 
	, tx_loan_notes				    	varchar(MAX)						NULL
	, tx_notes_by			 	    varchar(128)						NULL
	
	, CONSTRAINT pk_id_notes_key PRIMARY KEY CLUSTERED (_PRIMARY_KEY)
)
go

_GRANT_PERM_TBL