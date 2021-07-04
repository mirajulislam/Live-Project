/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul Islam
* Date          : 23 June 2021
* Description   : Table for Loan sms information
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_LMS_SMS_AUDIT};
#define _PRIMARY_KEY		{id_sms_key};
#define _VERSION			{id_sms_version};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	  _PRIMARY_KEY					    	INT	                		NOT NULL
	, _VERSION					  	     	INT						    NOT NULL
	, _TABLE_HEADER_WITH_STATE

    , tx_client_user_name                   VARCHAR(256)                NOT NULL
    , tx_client_cbs_sms_id                  VARCHAR(256)                NOT NULL
    , dtt_txn_date_time					    DATETIME
    , tx_sender_id                          VARCHAR(256)                NOT NULL
    , tx_sms_type                           VARCHAR(256)                NOT NULL
    , tx_acct_id                            VARCHAR(256)                NOT NULL
    , tx_credit_debit                       VARCHAR(256)                NOT NULL
    , dec_amount                            DECIMAL(20, 2)              NOT NULL
    , tx_cell_phone                         VARCHAR(256)                NOT NULL
    , tx_send_to_number                     VARCHAR(256)                NOT NULL
    , tx_message                            VARCHAR(256)                NOT NULL
    , dtt_client_request_datetime			DATETIME
    , dtt_expiry_datetime					DATETIME
    , int_retry_count                       INT                         NOT NULL
    , int_default_sms_length                INT                         NOT NULL
    , tx_telco_local_prefix                 VARCHAR(256)                NOT NULL
    , tx_telco_name                         VARCHAR(256)                NOT NULL
    , tx_status                             VARCHAR(256)                NOT NULL
    , tx_customer_no                        VARCHAR(256)                NOT NULL
    , tx_sms_format                         VARCHAR(256)                NOT NULL
    , int_unicode                           INT                         NOT NULL
    , int_message_type                      INT                         NOT NULL
    , tx_tz_name                            VARCHAR(256)                NOT NULL
    , id_loan_key                           INT                         NOT NULL
    , tx_sms_status                         VARCHAR(256)                NOT NULL
    , tx_gateway_name                      VARCHAR(256)                NOT NULL
    , dtt_operator_req_time                DATETIME                    NOT NULL

)

go

_GRANT_PERM_TBL