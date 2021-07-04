/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 24 DEC 2019
* Description   : Sp to SELECT information from T_LOAN Table
*****************************************************************************************/
#include <nSMART_SQL.h>
 

#define _SP_NAME		{SEL_loan};
#define _TABLE_NAME     {T_LOAN};
#define _PRIMARY_KEY    {id_loan_key};
#define _VERSION        {id_loan_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

	, @_PRIMARY_KEY					     INT					= NULL		
	, @_VERSION						     INT					= NULL	

    , @id_creator_key                    INT                   = NULL
    , @dtt_create                        DATETIME              = NULL
    , @id_customer_key                   INT                   = NULL       OUTPUT

    , @tx_application_no                 VARCHAR(256)           = NULL 

    , @id_loan_type_key                  INT                    = NULL
    , @id_customer_type_key              INT                    = NULL

    , @dec_applied_loan_amount           DECIMAL(20,2)          = NULL
    , @tx_loan_purpose                   VARCHAR(256)           = NULL
    , @int_over_loan                     INT                    = NULL
    , @dec_net_monthly_income            DECIMAL(20,2)          = NULL
    , @dec_tenor_year                    DECIMAL(20,2)          = NULL
    , @dec_existing_loan_amount          DECIMAL(20,2)          = NULL
    , @dec_interest_rate                 DECIMAL(20,2)          = NULL
    , @dec_total_emi                     DECIMAL(20,2)          = NULL
    , @dec_monthly_installment           DECIMAL(20,2)          = NULL
    , @dec_disposable_income             DECIMAL(20,2)          = NULL
    , @tx_propose_emi_date               VARCHAR(256)           = NULL
    , @tx_duplications                   VARCHAR(256)           = NULL
    , @dtt_cib_generation_date           DATETIME               = NULL
    , @dec_proposed_dbr                  DECIMAL(20,2)          = NULL
    , @dec_allowed_dbr                   DECIMAL(20,2)          = NULL
    , @tx_cib_status                     VARCHAR(256)           = NULL
    , @dec_price_quotation_amount        DECIMAL(20,2)          = NULL
    , @tx_bank_participation             VARCHAR(256)           = NULL
    , @dec_business_recommended_amnt     DECIMAL(20,2)          = NULL
    , @dec_recommended_for_approval      DECIMAL(20,2)          = NULL

    , @tx_security                      VARCHAR(256)           = NULL
    , @tx_dob_of_pg_year                VARCHAR(256)           = NULL
    , @tx_guarantor_elibiblity          VARCHAR(256)           = NULL
    , @dtt_dob_of_pg                    DATETIME               = NULL
    , @dec_remaining_amt_aft_eml        DECIMAL(20,2)          = NULL
    , @dec_gross_salary_per_month       DECIMAL(20,2)          = NULL
    , @tx_borrower_participation        VARCHAR(256)           = NULL
    , @id_legal_entity_key              INT                    = NULL
    , @id_customer_ver                  INT                    = NULL
    , @tx_name_of_guarantor             VARCHAR(256)           = NULL
    , @tx_relationship_with_applicant   VARCHAR(256)           = NULL    
    , @tx_relationship_with_pg          VARCHAR(256)           = NULL
    , @tx_data_source                   VARCHAR(256)           = NULL
    , @tx_loan_tracking_id              VARCHAR(32)            = NULL
    , @tx_verification_email            VARCHAR(64)            = NULL
    , @int_recommend_group_key          INT                    = NULL
    , @int_recommend_to_key             INT                    = NULL
    , @int_approved_by_key              INT                    = NULL
    , @tx_condition                     VARCHAR(256)           = NULL
    , @int_sl_generate_cnt              INT                    = NULL
    , @tx_staff_id                      VARCHAR(96)            = NULL
    , @dec_gPF_amount                   DECIMAL(20, 2)         = NULL
    , @tx_guarantor_nid                 VARCHAR(256)           = NULL
    , @tx_sourcing_brc                  VARCHAR(256)           = NULL
    , @tx_loan_group_id                 VARCHAR(16)            = NULL 
    , @dtt_group_create                 DATETIME               = NULL
    , @tx_mobile_guarantor              VARCHAR(256)           = NULL   
    , @int_top_up                        INT                    = NULL
    , @tx_account_no                    VARCHAR(256)           = NULL

	_SP_PARAM_FOOTER

AS

{
	_SP_SEL_HEADER
  
    SELECT  tx_rs_type = 'RS_TYPE_LOAN'
    , L.*
    , S.tx_state_name
    , s.id_fsm_state_key as id_state_key
    , S.tx_display_text as tx_state_display_label
    FROM  _TABLE_NAME L
    JOIN T_FSM_STATE   S ON L.id_state_key = S.id_fsm_state_key
    WHERE 	id_loan_key        = ISNULL(@id_loan_key      	,id_loan_key)
    AND 	tx_application_no  = ISNULL(@tx_application_no  ,tx_application_no)
    AND    L.is_active = 1

	_SP_FOOTER
}
go

_GRANT_PERM_SP