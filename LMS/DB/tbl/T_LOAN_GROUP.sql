/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islam
* Date          : 19 OCT 2021
* Description   : Table for Loan Group
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_LOAN_GROUP};
#define _PRIMARY_KEY		{id_loan_group_key};
#define _VERSION			{id_loan_group_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	 	_PRIMARY_KEY					 	INT	IDENTITY(100000,1)		NOT NULL
	,	_VERSION					  	 	INT						    NOT NULL
	,	_TABLE_HEADER_WITH_STATE

	,	tx_loan_group_id                    VARCHAR(256)   				NOT NULL
	, 	tx_card_group_id                    VARCHAR(256)                NOT NULL
	,	tx_ho_crm_comment                   VARCHAR(256)   				NOT NULL
	,	tx_cad_comment                   	VARCHAR(256)   				NOT NULL
	,	dtt_group_create                    DATETIME       				NOT NULL	
	,	dec_total_group_amount              DECIMAL(20, 2)  			NOT NULL
	,	total_loan_this_group               INT             			NOT NULL
	, CONSTRAINT pk_id_loan_group_key PRIMARY KEY CLUSTERED(_PRIMARY_KEY)
)

go

_GRANT_PERM_TBL

--v1.3.0
--ALTER TABLE T_LOAN_GROUP_AUDIT ADD tx_card_group_id VARCHAR (256) NULL
--ALTER TABLE T_LOAN_GROUP ADD tx_card_group_id VARCHAR (256) NULL

--v1.3.1
--ALTER TABLE T_LOAN_GROUP ADD dec_total_group_amount DECIMAL (20, 2)  NULL;
--ALTER TABLE T_LOAN_GROUP_AUDIT ADD dec_total_group_amount DECIMAL (20, 2)  NULL;
--ALTER TABLE T_LOAN_GROUP ADD total_loan_this_group INT NOT NULL DEFAULT(0)
--ALTER TABLE T_LOAN_GROUP_AUDIT ADD total_loan_this_group INT NOT NULL DEFAULT(0)