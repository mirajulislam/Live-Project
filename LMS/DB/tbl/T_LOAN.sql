/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 24 DEC 2019
* Description   : Table for Loan information
* Comment       : tx_sourcing_brc, tx_staff_id will only insert
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_LOAN};
#define _PRIMARY_KEY		{id_loan_key};
#define _VERSION			{id_loan_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	  _PRIMARY_KEY					 	INT	IDENTITY(100000,1)		NOT NULL
	, _VERSION					  	 	INT						    NOT NULL
	, _TABLE_HEADER_WITH_STATE


    ,id_creator_key                     INT             NOT NULL
    ,dtt_create                         DATETIME        NOT NULL
    ,id_customer_key                    INT             NOT NULL
    ,id_customer_ver                    INT             NOT NULL
    ,tx_application_no                  VARCHAR(256)    NOT NULL
    ,id_loan_type_key                   INT             NOT NULL
    ,id_customer_type_key               INT             NOT NULL
    ,dec_applied_loan_amount            DECIMAL(20, 2)  NOT NULL
    ,tx_loan_purpose                    VARCHAR(256)    NOT NULL
    ,int_over_loan                      INT             NOT NULL
    ,dec_net_monthly_income             DECIMAL(20, 2)  NOT NULL
    ,dec_tenor_year                     DECIMAL(20, 2)  NOT NULL
    ,dec_existing_loan_amount           DECIMAL(20, 2)  NOT NULL
    ,dec_interest_rate                  DECIMAL(20, 2)  NOT NULL
    ,dec_total_emi                      DECIMAL(20, 2)  NOT NULL
    ,dec_monthly_installment            DECIMAL(20, 2)  NOT NULL
    ,dec_disposable_income              DECIMAL(20, 2)  NOT NULL
    ,tx_propose_emi_date                VARCHAR(256)    NOT NULL
    ,tx_duplications                    VARCHAR(256)    NOT NULL
    ,dtt_cib_generation_date            DATETIME        NULL
    ,dec_proposed_dbr                   DECIMAL(20, 2)  NOT NULL
    ,dec_allowed_dbr                    DECIMAL(20, 2)  NOT NULL
    ,tx_cib_status                      VARCHAR(256)    NOT NULL
    ,dec_price_quotation_amount         DECIMAL(20, 2)  NOT NULL
    ,tx_bank_participation              VARCHAR(256)    NOT NULL
    ,dec_business_recommended_amnt      DECIMAL(20, 2)  NOT NULL
    ,dec_recommended_for_approval       DECIMAL(20, 2)  NOT NULL
    ,tx_security                        VARCHAR(256)    NOT NULL
    ,tx_dob_of_pg_year                  VARCHAR(256)    NOT NULL
    ,tx_guarantor_elibiblity            VARCHAR(256)    NOT NULL
    ,dtt_dob_of_pg                      DATETIME        NULL
    ,dec_remaining_amt_aft_eml          DECIMAL(20, 2)  NOT NULL
    ,dec_gross_salary_per_month         DECIMAL(20, 2)  NOT NULL
    ,tx_borrower_participation          VARCHAR(256)    NOT NULL
    ,id_legal_entity_key                INT             NOT NULL
    ,tx_name_of_guarantor               VARCHAR(256)    NOT NULL
    ,tx_relationship_with_applicant     VARCHAR(256)    NOT NULL
    ,tx_data_source                     VARCHAR(256)    NOT NULL
    ,tx_loan_tracking_id                VARCHAR(32)     NOT NULL
    ,tx_verification_email              VARCHAR(64)     NOT NULL
    ,int_recommend_group_key            INT             NOT NULL
    ,int_recommend_to_key               INT             NOT NULL
    ,int_approved_by_key                INT             NOT NULL
    ,tx_relationship_with_pg            VARCHAR(256)    NOT NULL
    ,tx_condition                       VARCHAR(256)    NOT NULL
    ,tx_staff_id                        VARCHAR(96)     NOT NULL
    ,int_sl_generate_cnt                INT             NOT NULL
    ,dec_gPF_amount                     DECIMAL(20, 2)  NOT NULL
    ,tx_guarantor_nid                   VARCHAR(256)    NOT NULL
    ,tx_sourcing_brc                    VARCHAR(256)    NOT NULL
    ,dtt_group_create                   DATETIME        NOT NULL
    ,int_in_group                       INT             NOT NULL  --0 for not create group , 1 for create group , 2 for remove from group
    ,tx_mobile_guarantor                VARCHAR(256)    NOT NULL
    ,int_top_up                          INT             NOT NULL
    ,tx_account_no                     VARCHAR(256)     NOT NULL
    ,tx_sms_status                     VARCHAR(256)     NOT NULL

    , CONSTRAINT pk_id_loan_key PRIMARY KEY CLUSTERED(_PRIMARY_KEY)
)

go

_GRANT_PERM_TBL

-- ALTER TABLE T_LOAN ADD tx_sourcing_brc VARCHAR(256) NULL

-- ALTER TABLE T_LOAN ADD int_in_group INT NOT NULL DEFAULT(0)
-- ALTER TABLE T_LOAN_AUDIT ADD int_in_group INT NOT NULL DEFAULT(0)
-- 0 for not create group
-- 1 for create group
-- 2 for remove from group
--ALTER TABLE T_LOAN ADD int_top_up INT NOT NULL DEFAULT(0)
--ALTER TABLE T_LOAN_AUDIT ADD int_top_up INT NOT NULL DEFAULT(0)
--ALTER TABLE T_LOAN ADD tx_account_no VARCHAR(256) NULL
--ALTER TABLE T_LOAN_AUDIT ADD tx_account_no VARCHAR(256) NULL

-- ALTER TABLE T_LOAN_AUDIT ADD tx_sms_status VARCHAR (256)  NULL;
-- ALTER TABLE T_LOAN ADD tx_sms_status VARCHAR (256)  NULL;