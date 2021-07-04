/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 24 DEC 2019
* Description   : Sp to INSERT information in T_LOAN Table
*****************************************************************************************/
#include <nSMART_SQL.h>

 
#define _SP_NAME		{INS_loan};
#define _TABLE_NAME     {T_LOAN};
#define _PRIMARY_KEY    {id_loan_key};
#define _VERSION        {id_loan_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)

    _SP_PARAM_HEADER

    , @_PRIMARY_KEY                      INT                    = NULL      OUTPUT   
    , @_VERSION                          INT                    = NULL 

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
    , @id_loan_group_creator_key        INT                    = NULL 
    , @dtt_group_create                 DATETIME               = NULL
    , @tx_mobile_guarantor              VARCHAR(256)           = NULL
    , @int_top_up                        INT                    = NULL
    , @tx_account_no                    VARCHAR(256)           = NULL
    _SP_PARAM_FOOTER

AS

{
	_SP_HEADER

	_INIT_VERSION(@_VERSION)

    IF(@dtt_dob_of_pg IS NULL)
    {
        set @tx_dob_of_pg_year = ''
    }

    IF(@tx_loan_tracking_id IS NULL)
    {
        SET @tx_loan_tracking_id = (select id_key_value from T_SYSTEM_KEY
        where tx_key_name = 'id_loan_tracking_id_key')

        SELECT @tx_loan_tracking_id

        UPDATE S
        SET S.id_system_ver = S.id_system_ver + 1
        , S.id_key_value = S.id_key_value + 1
        from T_SYSTEM_KEY S
        where tx_key_name = 'id_loan_tracking_id_key'
    }


	INSERT INTO _TABLE_NAME
    (
        id_loan_ver
        ,_TABLE_HEADER_INS_FIELD_WITH_STATE
     
        , id_creator_key 
        , dtt_create     
        , id_customer_key
        ,id_customer_ver

        , tx_application_no           
        , id_loan_type_key              
        , id_customer_type_key              
        , dec_applied_loan_amount   
        , tx_loan_purpose           
        , int_over_loan             
        , dec_net_monthly_income    
        , dec_tenor_year            
        , dec_existing_loan_amount  
        , dec_interest_rate         
        , dec_total_emi             
        , dec_monthly_installment   
        , dec_disposable_income     
        , tx_propose_emi_date       
        , tx_duplications           
        , dtt_cib_generation_date   
        , dec_proposed_dbr          
        , dec_allowed_dbr           
        , tx_cib_status                          
        , dec_price_quotation_amount
        , tx_bank_participation
        , dec_business_recommended_amnt 
        , dec_recommended_for_approval

        ,tx_security
        ,tx_dob_of_pg_year
        ,tx_guarantor_elibiblity
        ,dtt_dob_of_pg
        ,dec_remaining_amt_aft_eml
        ,dec_gross_salary_per_month
        ,tx_borrower_participation
        ,id_legal_entity_key
        ,tx_name_of_guarantor
        ,tx_relationship_with_applicant
        ,tx_data_source
        ,tx_loan_tracking_id
        ,tx_verification_email
        ,int_recommend_group_key
        ,int_recommend_to_key
        ,int_approved_by_key
        ,tx_relationship_with_pg
        ,tx_condition
        ,tx_staff_id
        ,int_sl_generate_cnt
        ,dec_gPF_amount
        ,tx_guarantor_nid
        ,tx_sourcing_brc
        ,tx_loan_group_id
        ,id_loan_group_creator_key
        ,dtt_group_create
        ,tx_mobile_guarantor
        ,int_top_up
        ,tx_account_no
    )
    VALUES
    (  
        @_VERSION
        ,_TABLE_HEADER_INS_VAL_WITH_STATE

        , ISNULL(@id_creator_key               , _DB_NULL_INT)
        , ISNULL(@dtt_create                   , GETDATE())
        , ISNULL(@id_customer_key              , _DB_NULL_INT)
        , ISNULL(@id_customer_ver              , _DB_NULL_INT)

        , ISNULL(@tx_application_no            , _DB_NULL_STR)
        , ISNULL(@id_loan_type_key             , _DB_NULL_INT)
        , ISNULL(@id_customer_type_key         , _DB_NULL_INT)
        , ISNULL(@dec_applied_loan_amount      , _DB_NULL_FLOAT)
        , ISNULL(@tx_loan_purpose              , _DB_NULL_STR)
        , ISNULL(@int_over_loan                , _DB_NULL_INT)
        , ISNULL(@dec_net_monthly_income       , _DB_NULL_FLOAT)
        , ISNULL(@dec_tenor_year               , _DB_NULL_FLOAT)
        , ISNULL(@dec_existing_loan_amount     , _DB_NULL_FLOAT)
        , ISNULL(@dec_interest_rate            , _DB_NULL_FLOAT)
        , ISNULL(@dec_total_emi                , _DB_NULL_FLOAT)
        , ISNULL(@dec_monthly_installment      , _DB_NULL_FLOAT)
        , ISNULL(@dec_disposable_income        , _DB_NULL_FLOAT)
        , ISNULL(@tx_propose_emi_date          , _DB_NULL_STR)
        , ISNULL(@tx_duplications              , _DB_NULL_STR)
        , @dtt_cib_generation_date
        , ISNULL(@dec_proposed_dbr             , _DB_NULL_FLOAT)
        , ISNULL(@dec_allowed_dbr              , _DB_NULL_FLOAT)
        , ISNULL(@tx_cib_status                , _DB_NULL_STR)
        , ISNULL(@dec_price_quotation_amount   , _DB_NULL_FLOAT)
        , ISNULL(@tx_bank_participation        , _DB_NULL_STR)
        , ISNULL(@dec_business_recommended_amnt, _DB_NULL_FLOAT)
        , ISNULL(@dec_recommended_for_approval , _DB_NULL_FLOAT)

        , ISNULL(@tx_security                  , _DB_NULL_STR)
        , ISNULL(@tx_dob_of_pg_year            , _DB_NULL_STR)
        , ISNULL(@tx_guarantor_elibiblity      , _DB_NULL_STR)
        , @dtt_dob_of_pg
        , ISNULL(@dec_remaining_amt_aft_eml    , _DB_NULL_FLOAT)
        , ISNULL(@dec_gross_salary_per_month   , _DB_NULL_FLOAT)
        , ISNULL(@tx_borrower_participation    , _DB_NULL_STR)
        , ISNULL(@id_legal_entity_key          , _DB_NULL_INT)
        , ISNULL(@tx_name_of_guarantor         , _DB_NULL_STR)
        , ISNULL(@tx_relationship_with_applicant, _DB_NULL_STR)
        , ISNULL(@tx_data_source               , _DB_NULL_STR)
        , ISNULL(@tx_loan_tracking_id          , _DB_NULL_STR)
        , ISNULL(@tx_verification_email        , _DB_NULL_STR)
        , ISNULL(@int_recommend_group_key      , _DB_NULL_INT)
        , ISNULL(@int_recommend_to_key         , _DB_NULL_INT)
        , ISNULL(@int_approved_by_key          , _DB_NULL_INT)
        , ISNULL(@tx_relationship_with_pg      , _DB_NULL_STR)
        , ISNULL(@tx_condition                 , _DB_NULL_STR)
        , ISNULL(@tx_staff_id                  , _DB_NULL_STR)
        , ISNULL(@int_sl_generate_cnt          , 0)
        , ISNULL(@dec_gPF_amount               , _DB_NULL_FLOAT)
        , ISNULL(@tx_guarantor_nid             , _DB_NULL_STR)
        , ISNULL(@tx_sourcing_brc              , _DB_NULL_STR)
        , ISNULL(@tx_loan_group_id             , _DB_NULL_STR)
        , ISNULL(@id_loan_group_creator_key    , _DB_NULL_INT) 
        , ISNULL(@dtt_group_create             , GETDATE())
        , ISNULL(@tx_mobile_guarantor          , _DB_NULL_STR)
        , ISNULL(@int_top_up                    , _DB_NULL_INT)
        , ISNULL(@tx_account_no                    , _DB_NULL_INT)      
        
    )

    SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_LOAN')

    SELECT @id_customer_key = 
    (
      SELECT id_customer_key FROM T_LOAN 
      WHERE   id_loan_key   = @_PRIMARY_KEY
    )

	_STORE_SYS_VARS
	SELECT @g_tx_err_msg = _GEM_INSERT(_TABLE_NAME, @_PRIMARY_KEY)
	
	_HANDLE_ZERO_ROW_COUNT(_GEC_INSERT, @g_tx_err_msg)

	_TOUCHED_TABLE(_TABLE_NAME)


	_SP_FOOTER

	RETURN _STATUS_OK
}
go

_GRANT_PERM_SP