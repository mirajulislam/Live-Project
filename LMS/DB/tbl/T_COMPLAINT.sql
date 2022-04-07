/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islam
* Date          : 15 FEB 2021
* Description   : Table for ATM DISPUTE COMPLAINT information
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_COMPLAINT};
#define _PRIMARY_KEY		{id_customer_complaint_key};
#define _VERSION			{id_customer_complaint_ver};
_DROP_TABLE
_CREATE_TABLE(_TABLE_NAME )

(
	  _PRIMARY_KEY					 	INT	IDENTITY(100000,1)		NOT NULL
	, _VERSION					  	 	INT						    NOT NULL
	, _TABLE_HEADER_WITH_STATE

	, dtt_txn_date 						DATETIME        NOT NULL
	, dtt_create                        DATETIME        NOT NULL
	, tx_atm_owner						VARCHAR(256)    NOT NULL
	, dec_txn_amount					DECIMAL(20, 2)  NOT NULL
	, tx_account_number					VARCHAR(256)    NOT NULL
	, tx_card_number					VARCHAR(256)    NOT NULL
	, tx_atm_location					VARCHAR(256)    NOT NULL
	, tx_comment						VARCHAR(256)    NOT NULL
	, tx_data_source					VARCHAR(256)    NOT NULL
	, id_creator_key                    INT             NOT NULL 
	, int_tracking_number               INT             NOT NULL   

	, CONSTRAINT pk_id_customer_complaint_key PRIMARY KEY CLUSTERED(_PRIMARY_KEY)
)

go

_GRANT_PERM_TBL