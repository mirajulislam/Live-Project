/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 05 Aug 2021
* Description   : Table for Credit Card information
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_CREDIT_CARD_AUDIT};
#define _PRIMARY_KEY		{id_credit_card_key};
#define _VERSION			{id_credit_card_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	  _PRIMARY_KEY					 	INT	           		NOT NULL
	, _VERSION					  	 	INT					NOT NULL
	, _TABLE_HEADER_WITH_STATE

    , id_legal_entity_key                   INT             NOT NULL
    , id_customer_key                       INT             NOT NULL
    , id_creator_key                        INT             NOT NULL
    , dtt_create                            DATETIME        NOT NULL
    , id_card_type_key                      INT             NOT NULL
    , id_customer_type_key                  INT             NOT NULL
    , tx_data_source                        VARCHAR(32)     NOT NULL
    , tx_account_no                         VARCHAR(32)     NOT NULL
    , tx_sourcing_branch                    VARCHAR(32)     NOT NULL
    , tx_sourcing_staff_id                  VARCHAR(32)     NOT NULL
    , tx_source_branch                      VARCHAR(128)    NOT NULL
    , tx_source_cse                         VARCHAR(128)    NOT NULL
    , tx_source_self_application            VARCHAR(128)    NOT NULL
    , tx_source_others                      VARCHAR(128)    NOT NULL
    , int_cc_tracking_number                INT             NOT NULL
    , tx_application_number                 VARCHAR(64)     NOT NULL
    , tx_source_from                        VARCHAR(256)    NOT NULL
    , tx_card_monthly_bil_debited_from      VARCHAR(64)     NOT NULL
    , dec_salary_deposited_last_month       DECIMAL(20, 2)  NOT NULL
    , dec_additional_income_amount          DECIMAL(20, 2)  NOT NULL
    , dec_after_cbbl_emi                    DECIMAL(20, 2)  NOT NULL
    , dec_total_income                      DECIMAL(20, 2)  NOT NULL
    , dec_total_emi_paid_in_cbbl            DECIMAL(20, 2)  NOT NULL
    , tx_auto_debit_req_minimum_amount      VARCHAR(256)    NOT NULL
    , dec_remaining_emi                     DECIMAL(20, 2)  NOT NULL
    , tx_additional_income_source           VARCHAR(256)    NOT NULL
    , tx_value_of_security                  VARCHAR(256)    NOT NULL
    , tx_loan_to_value                      VARCHAR(256)    NOT NULL
    , tx_gpf_loan                           VARCHAR(256)    NOT NULL
    , dec_pre_approved_limit                DECIMAL(20, 2)  NOT NULL
    , dec_pre_approved_limit_lower          DECIMAL(20, 2)  NOT NULL
    , dec_pre_approved_limited_upper        DECIMAL(20, 2)  NOT NULL
    , dec_pre_approved_limit_range          DECIMAL(20, 2)  NOT NULL
    , dec_applied_card_min_bill             DECIMAL(20, 2)  NOT NULL
    , dec_applied_amount                    DECIMAL(20, 2)  NOT NULL 
    , tx_individual_declaration             VARCHAR(256)    NOT NULL
    , tx_card_delivery_from                 VARCHAR(256)    NOT NULL
    , tx_declaration                        VARCHAR(256)    NOT NULL
    , dec_auto_debit_req_min_amount         DECIMAL(20, 2)  NOT NULL
    , tx_auto_debit_req_full_outstanding    VARCHAR(256)    NOT NULL
    , tx_card_duplication_result            VARCHAR(1024)   NOT NULL
    , tx_card_duplication_reason            VARCHAR(1024)   NOT NULL
    , tx_un_sanction_result                 VARCHAR(1024)   NOT NULL
    , tx_un_sanction_reason                 VARCHAR(1024)   NOT NULL
    , tx_ofac_sanction_result               VARCHAR(1024)   NOT NULL
    , tx_ofac_sanction_reason               VARCHAR(1024)   NOT NULL
    , dec_applicant_asking_limit            DECIMAL(20, 2)  NOT NULL
    , dec_max_allowd_limit                  DECIMAL(20, 2)  NOT NULL
    , dec_approved_limit                    DECIMAL(20, 2)  NOT NULL
    , dec_balance_transfer_request_amount   DECIMAL(20, 2)  NOT NULL
    , dec_card_proposed_limit               DECIMAL(20, 2)  NOT NULL
    , tx_proposed_billing_date              VARCHAR(256)    NOT NULL
    , dec_minimum_payment                   DECIMAL(20, 2)  NOT NULL
    , tx_bt_credit_card_outstanding         VARCHAR(256)    NOT NULL
    , tx_kyc_level                          VARCHAR(256)    NOT NULL
    , tx_auto_debit_amount                  VARCHAR(256)    NOT NULL
    , dec_interest_rate                     DECIMAL(20, 2)  NOT NULL
    , dt_cib_generation                     DATETIME        NOT NULL
    , tx_cib_status                         VARCHAR(256)    NOT NULL
    , dec_proposed_dbr                      DECIMAL(20, 2)  NOT NULL
    , dec_net_monthly_income                VARCHAR(256)    NOT NULL
    , tx_current_type_based_on_card_nature  VARCHAR(256)    NOT NULL
    , tx_card_security_type                 VARCHAR(256)    NOT NULL
    , dec_allowed_muiltiplier               DECIMAL(20, 2)  NOT NULL
    , dec_amout_deposite_cbbl               DECIMAL(20, 2)  NOT NULL
    , dec_remaining_amount_after_paid_emi   DECIMAL(20, 2)  NOT NULL
    , dec_disposable_income                 DECIMAL(20, 2)  NOT NULL
    , dec_existing_loan_emi                 DECIMAL(20, 2)  NOT NULL
    , dec_total_emi                         DECIMAL(20, 2)  NOT NULL
    , tx_duplications                       VARCHAR(256)    NOT NULL
    , tx_maximum_allowed_multiplier         VARCHAR(256)    NOT NULL
    , dec_maximum_allowed_dbr               DECIMAL(20, 2)  NOT NULL
    , dec_recommend_for_approval            DECIMAL(20, 2)  NOT NULL
    , tx_concer_bank_name                   VARCHAR(256)    NOT NULL
    , tx_bt_request                         VARCHAR(256)    NOT NULL
    , int_in_group                          INT             NOT NULL
    , tx_card_group_id                      VARCHAR(256)    NOT NULL
    , id_card_group_creator_key             INT             NOT NULL
    , dtt_group_create                      DATETIME        NOT NULL
    , tx_duplication_areas                  VARCHAR(256)    NOT NULL
    , tx_name_of_card                       VARCHAR(256)    NOT NULL
    , tx_reference_name                        VARCHAR(256)         NOT NULL
    , tx_relationship_with_applicant           VARCHAR(256)         NOT NULL            
    , tx_reference_profesion                   VARCHAR(256)         NOT NULL
    , tx_reference_name_of_organization        VARCHAR(256)         NOT NULL                
    , tx_reference_designation                 VARCHAR(256)         NOT NULL        
    , tx_reference_work_and_residence_address  VARCHAR(256)         NOT NULL                    
    , tx_reference_telephone                   VARCHAR(256)         NOT NULL    
    , tx_reference_mobile                      VARCHAR(256)         NOT NULL
    , tx_reference_email                       VARCHAR(256)         NOT NULL
    , tx_cib_report_status_list                VARCHAR(256)         NOT NULL
)

go

_GRANT_PERM_TBL

--ALTER TABLE T_CREDIT_CARD ADD tx_name_of_card VARCHAR (256)
--ALTER TABLE T_CREDIT_CARD_AUDIT ADD tx_name_of_card VARCHAR (256)
  /*   customer reference infor for credit card
ALTER TABLE T_CREDIT_CARD 
ADD tx_reference_name VARCHAR (256) NULL 
, tx_relationship_with_applicant VARCHAR (256) NULL
, tx_reference_profesion VARCHAR (256) NULL
, tx_reference_name_of_organization VARCHAR (256) NULL
, tx_reference_designation VARCHAR (256) NULL
, tx_reference_work_and_residence_address VARCHAR (256) NULL
, tx_reference_telephone VARCHAR (256) NULL
, tx_reference_mobile VARCHAR (256) NULL
, tx_reference_email VARCHAR (256) NULL
, tx_cib_report_status_list VARCHAR (256) NULL

ALTER TABLE T_CREDIT_CARD_AUDIT 
ADD tx_reference_name VARCHAR (256) NULL 
, tx_relationship_with_applicant VARCHAR (256) NULL
, tx_reference_profesion VARCHAR (256) NULL
, tx_reference_name_of_organization VARCHAR (256) NULL
, tx_reference_designation VARCHAR (256) NULL
, tx_reference_work_and_residence_address VARCHAR (256) NULL
, tx_reference_telephone VARCHAR (256) NULL
, tx_reference_mobile VARCHAR (256) NULL
, tx_reference_email VARCHAR (256) NULL
, tx_cib_report_status_list VARCHAR (256) NULL

*/
