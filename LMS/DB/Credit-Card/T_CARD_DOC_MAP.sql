
/******************************************************************************
* Author		: Kh. Assaduzzaman Sohan
* Date			: 05 Aug 2021
* Description	: Loan Document Mapping for LMS
******************************************************************************/
#include <nSMART_SQL.h>
#define _TABLE_NAME 		{dbo.T_CARD_DOC_MAP};
#define _PRIMARY_KEY		{id_card_doc_map_key};
#define _VERSION			{id_card_doc_map_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME)
(
	  _PRIMARY_KEY					int		identity(100000, 1)         NOT NULL
	, _VERSION						int									NOT NULL
	, _TABLE_HEADER_WITH_STATE
	, id_card_config_key			int									NULL
	, id_doc_key					int									NULL								 
	, is_mandatory					int									NULL
	
	, CONSTRAINT id_card_doc_map_key PRIMARY KEY CLUSTERED (_PRIMARY_KEY)
)
go

CREATE INDEX id_card_doc_map_key
	ON dbo.T_CARD_DOC_MAP(id_card_config_key, id_doc_key, is_mandatory)
go


_GRANT_PERM_TBL