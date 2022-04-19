/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islam
* Date          : 15 FEB 2021
* Description   : Table for ATM DISPUTE COMPLAINT information
*****************************************************************************************/
 	
EXEC DROP_db_object @tx_db_object_type = 'U', @tx_db_object_name = 'T_COMPLAINT'
	go
IF ('CREATE' = 'CREATE')
        PRINT '**** WARNING : CEATING TBL ****'
    ELSE IF ('CREATE' = 'ALTER')
        PRINT '**** WARNING : ALTER TBL ****'
    ELSE
        PRINT '**** WARNING : UNKNOWN TABLE ACTION  ****'
    go

    CREATE TABLE T_COMPLAINT

(
	  id_customer_complaint_key					 	INT	IDENTITY(100000,1)		NOT NULL
	, id_customer_complaint_ver					  	 	INT						    NOT NULL
	, is_active				int						NOT NULL
	, id_env_key			int						NOT NULL
	, id_user_mod_key		int						NOT NULL
	, dtt_mod				datetime				NOT NULL
	, id_event_key			int						NOT NULL
	, id_state_key			int						NOT NULL
	, id_action_key			int						NOT NULL

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

	, CONSTRAINT pk_id_customer_complaint_key PRIMARY KEY CLUSTERED(id_customer_complaint_key)
)

go

GRANT SELECT	ON T_COMPLAINT TO app_so, app_ro
	GRANT ALL		ON T_COMPLAINT TO app_rw
	go