/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 24 DEC 2019
* Description   : Sp to UPDATE information in T_LOAN Table
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {UPD_loan};
#define _TABLE_NAME     {T_LOAN};
#define _PRIMARY_KEY    {id_loan_key};
#define _VERSION        {id_loan_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)

	_SP_PARAM_HEADER

  , @_PRIMARY_KEY                      INT                    = NULL   OUTPUT 
  , @_VERSION                          INT                    = NULL    

  , @id_creator_key                    INT                    = NULL
  , @dtt_create                        DATETIME               = NULL
  , @id_customer_key                   INT                    = NULL    OUTPUT

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

  , @tx_security                      VARCHAR(256)            = NULL
  , @tx_dob_of_pg_year                VARCHAR(256)            = NULL
  , @tx_guarantor_elibiblity          VARCHAR(256)            = NULL
  , @dtt_dob_of_pg                    DATETIME                = NULL
  , @dec_remaining_amt_aft_eml        DECIMAL(20,2)           = NULL
  , @dec_gross_salary_per_month       DECIMAL(20,2)           = NULL
  , @tx_borrower_participation        VARCHAR(256)            = NULL
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
  , @dtt_group_create                 DATETIME               = NULL
  , @tx_mobile_guarantor              VARCHAR(256)           = NULL
  , @int_top_up                        INT                    = NULL
  , @tx_account_no                    VARCHAR(256)           = NULL

  _SP_PARAM_FOOTER

AS

{
	_SP_HEADER


  IF(@dtt_dob_of_pg IS NULL)
  {
      set @tx_dob_of_pg_year = ''
  }

  SELECT @id_loan_ver = (SELECT id_loan_ver FROM T_LOAN WHERE id_loan_key = @id_loan_key)

  UPDATE _TABLE_NAME
  SET 
  _TABLE_HEADER_UPD_WITH_STATE
  , id_loan_ver                   = @id_loan_ver + 1
  , id_customer_key               = ISNULL(@id_customer_key               ,id_customer_key)

  , tx_application_no             = ISNULL(@tx_application_no             ,tx_application_no)

  , id_loan_type_key              = ISNULL(@id_loan_type_key              ,id_loan_type_key)
  , id_customer_type_key          = ISNULL(@id_customer_type_key          ,id_customer_type_key)

  , dec_applied_loan_amount       = ISNULL(@dec_applied_loan_amount       ,dec_applied_loan_amount)
  , tx_loan_purpose               = ISNULL(@tx_loan_purpose               ,tx_loan_purpose)
  , int_over_loan                 = ISNULL(@int_over_loan                 ,int_over_loan)
  , dec_net_monthly_income        = ISNULL(@dec_net_monthly_income        ,dec_net_monthly_income)
  , dec_tenor_year                = ISNULL(@dec_tenor_year                ,dec_tenor_year)
  , dec_existing_loan_amount      = ISNULL(@dec_existing_loan_amount      ,dec_existing_loan_amount)
  , dec_interest_rate             = ISNULL(@dec_interest_rate             ,dec_interest_rate)
  , dec_total_emi                 = ISNULL(@dec_total_emi                 ,dec_total_emi)
  , dec_monthly_installment       = ISNULL(@dec_monthly_installment       ,dec_monthly_installment)
  , dec_disposable_income         = ISNULL(@dec_disposable_income         ,dec_disposable_income)
  , tx_propose_emi_date           = ISNULL(@tx_propose_emi_date           ,tx_propose_emi_date)
  , tx_duplications               = ISNULL(@tx_duplications               ,tx_duplications)
  , dtt_cib_generation_date       = ISNULL(@dtt_cib_generation_date       ,dtt_cib_generation_date)
  , dec_proposed_dbr              = ISNULL(@dec_proposed_dbr              ,dec_proposed_dbr)
  , dec_allowed_dbr               = ISNULL(@dec_allowed_dbr               ,dec_allowed_dbr)
  , tx_cib_status                 = ISNULL(@tx_cib_status                 ,tx_cib_status)
  , dec_price_quotation_amount    = ISNULL(@dec_price_quotation_amount    ,dec_price_quotation_amount)
  , tx_bank_participation         = ISNULL(@tx_bank_participation         ,tx_bank_participation)
  , dec_business_recommended_amnt = ISNULL(@dec_business_recommended_amnt ,dec_business_recommended_amnt)
  , dec_recommended_for_approval  = ISNULL(@dec_recommended_for_approval  ,dec_recommended_for_approval)

  , tx_security                   = ISNULL(@tx_security                   ,tx_security)
  , tx_dob_of_pg_year             = ISNULL(@tx_dob_of_pg_year             ,tx_dob_of_pg_year)
  , tx_guarantor_elibiblity       = ISNULL(@tx_guarantor_elibiblity       ,tx_guarantor_elibiblity)
  , dtt_dob_of_pg                 = ISNULL(@dtt_dob_of_pg                 ,dtt_dob_of_pg)
  , dec_remaining_amt_aft_eml     = ISNULL(@dec_remaining_amt_aft_eml     ,dec_remaining_amt_aft_eml)
  , dec_gross_salary_per_month    = ISNULL(@dec_gross_salary_per_month    ,dec_gross_salary_per_month)
  , tx_borrower_participation     = ISNULL(@tx_borrower_participation     ,tx_borrower_participation)
  , id_legal_entity_key           = ISNULL(@id_legal_entity_key           ,id_legal_entity_key)
  , id_customer_ver               = ISNULL(@id_customer_ver               ,id_customer_ver)
  , tx_name_of_guarantor          = ISNULL(@tx_name_of_guarantor          ,tx_name_of_guarantor)
  , tx_relationship_with_applicant  = ISNULL(@tx_relationship_with_applicant    ,tx_relationship_with_applicant)

  , tx_loan_tracking_id           = ISNULL(@tx_loan_tracking_id           ,tx_loan_tracking_id)
  , tx_verification_email         = ISNULL(@tx_verification_email         ,tx_verification_email)
  , int_recommend_group_key       = ISNULL(@int_recommend_group_key       ,int_recommend_group_key)
  , int_recommend_to_key          = ISNULL(@int_recommend_to_key          ,int_recommend_to_key)
  , int_approved_by_key           = ISNULL(@int_approved_by_key           ,int_approved_by_key)
  , tx_relationship_with_pg       = ISNULL(@tx_relationship_with_pg       ,tx_relationship_with_pg)
  , tx_condition                  = ISNULL(@tx_condition                  ,tx_condition)
  , int_sl_generate_cnt           = ISNULL(@int_sl_generate_cnt           ,int_sl_generate_cnt)
  , dec_gPF_amount                = ISNULL(@dec_gPF_amount                ,dec_gPF_amount)
  , tx_guarantor_nid              = ISNULL(@tx_guarantor_nid              ,tx_guarantor_nid)
  , dtt_group_create              = ISNULL(@dtt_group_create              ,dtt_group_create)
  , tx_mobile_guarantor           = ISNULL(@tx_mobile_guarantor           ,tx_mobile_guarantor)
  , int_top_up                     = ISNULL(@int_top_up                     ,int_top_up)
  , tx_account_no                 = ISNULL(@tx_account_no                     ,tx_account_no)

  WHERE   id_loan_key             = @id_loan_key
  AND     is_active = 1
	
  SELECT @id_customer_key = 
  (
    SELECT id_customer_key FROM T_LOAN 
    WHERE   id_loan_key        = @id_loan_key
    AND     is_active = 1
  )

  _TOUCHED_TABLE(_TABLE_NAME)

	_SP_FOOTER

	RETURN _STATUS_OK
}
go

_GRANT_PERM_SP