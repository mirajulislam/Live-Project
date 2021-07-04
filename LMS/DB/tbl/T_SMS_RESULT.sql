/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul Islam
* Date          : 23 June 2021
* Description   : Table for Loan sms result 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_SMS_RESULT};
#define _PRIMARY_KEY		{id_sms_result_key};
#define _VERSION			{id_sms_result_version};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	  _PRIMARY_KEY					    	INT	IDENTITY(100000,1)		NOT NULL
	, _VERSION					  	     	INT						    NOT NULL
	, _TABLE_HEADER_WITH_STATE
    
    , tx_gateway_id                         VARCHAR(256)                NOT NULL
    , tx_gateway_name                       VARCHAR(256)                NOT NULL
    , tx_client_cbs_sms_id                  VARCHAR(256)                NOT NULL
    , tx_sms_number                         VARCHAR(256)                NOT NULL
    , tx_sms_status                         VARCHAR(256)                NOT NULL
    , tx_telco_sms_id                       VARCHAR(256)                NOT NULL
    , tx_sender_id                          VARCHAR(256)                NOT NULL
    , id_loan_key                           INT                         NOT NULL 
    , tx_sms_msg                            VARCHAR(256)                NOT NULL
    , dtt_telco_response_time		 	    DATETIME

	, CONSTRAINT pk_id_sms_result_key PRIMARY KEY CLUSTERED(_PRIMARY_KEY)

)

go

_GRANT_PERM_TBL