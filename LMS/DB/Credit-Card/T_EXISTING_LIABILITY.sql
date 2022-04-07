
/******************************************************************************
* Author		: MMd. Kamruzzaman
* Date			: 29 December 2019
* Description	: 
******************************************************************************/
#include <nSMART_SQL.h>
#define _TABLE_NAME 		{T_EXISTING_LIABILITY};
#define _PRIMARY_KEY		{id_existing_liability_key};
#define _VERSION			{id_existing_liability_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME)

(
	  _PRIMARY_KEY					int		identity(100000, 1)         NOT NULL
	, _VERSION						int									NOT NULL
	, _TABLE_HEADER_WITH_STATE
	
	, id_loan_key					int 								null
	, tx_bank_name					varchar(64)							NULL
	, tx_product_name				varchar(64)							NULL
	, dec_disbursed					decimal(16, 3)									NULL								 
	, dec_current_outstanding		decimal(16, 3)									NULL								 
	, dec_emi_size					decimal(16, 3)									NULL
	, tx_remarks					varchar(512)									NULL
	
	, CONSTRAINT pk_existing_liability_key PRIMARY KEY CLUSTERED (_PRIMARY_KEY)
)
go

_GRANT_PERM_TBL

-- ALTER TABLE T_EXISTING_LIABILITY ADD id_credit_card_key INT NULL
--ALTER TABLE T_EXISTING_LIABILITY ADD tx_group_name VARCHAR (248) NULL , tx_object_type VARCHAR (248) NULL