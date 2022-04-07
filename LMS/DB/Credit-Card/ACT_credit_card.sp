/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 24 DEC 2019
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_credit_card};
#define _TABLE_NAME     {T_CREDIT_CARD};
#define _PRIMARY_KEY    {id_credit_card_key};
#define _VERSION        {id_credit_card_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

    , @_PRIMARY_KEY                         INT                    = NULL       OUTPUT
    , @_VERSION                             INT                    = NULL   

    , @id_customer_key                      INT                 = NULL
    , @id_creator_key                       INT                 = NULL
    , @dtt_create                           DATETIME            = NULL
    , @id_card_type_key                     INT                 = NULL
    , @id_customer_type_key                 INT                 = NULL 
    , @tx_data_source                       VARCHAR(32)         = NULL
    , @tx_account_no                        VARCHAR(32)         = NULL
    , @tx_sourcing_branch                   VARCHAR(32)         = NULL
    , @tx_sourcing_staff_id                 VARCHAR(32)         = NULL
    , @tx_source_branch                     VARCHAR(128)        = NULL
    , @tx_source_cse                        VARCHAR(128)        = NULL
    , @tx_source_self_application           VARCHAR(128)        = NULL
    , @tx_source_others                     VARCHAR(128)        = NULL
    , @int_cc_tracking_number               INT                 = NULL
    , @tx_application_number                VARCHAR(64)         = NULL
    , @tx_source_from                       VARCHAR(256)        = NULL
    , @tx_card_monthly_bil_debited_from     VARCHAR(64)         = NULL
    , @dec_salary_deposited_last_month      DECIMAL(20, 2)      = NULL
    , @dec_additional_income_amount         DECIMAL(20, 2)      = NULL
    , @dec_after_cbbl_emi                   DECIMAL(20, 2)      = NULL
    , @dec_total_income                     DECIMAL(20, 2)      = NULL
    , @dec_total_emi_paid_in_cbbl           DECIMAL(20, 2)      = NULL
    , @tx_auto_debit_req_minimum_amount     VARCHAR(256)        = NULL
    , @dec_remaining_emi                    DECIMAL(20, 2)      = NULL
    , @tx_additional_income_source          VARCHAR(256)        = NULL
    , @tx_value_of_security                 VARCHAR(256)        = NULL
    , @tx_loan_to_value                     VARCHAR(256)        = NULL
    , @tx_gpf_loan                          VARCHAR(256)        = NULL
    , @dec_pre_approved_limit               DECIMAL(20, 2)      = NULL
    , @dec_pre_approved_limit_lower         DECIMAL(20, 2)      = NULL
    , @dec_pre_approved_limited_upper       DECIMAL(20, 2)      = NULL
    , @dec_pre_approved_limit_range         DECIMAL(20, 2)      = NULL
    , @dec_applied_card_min_bill            DECIMAL(20, 2)      = NULL
    , @dec_applied_amount                   DECIMAL(20, 2)      = NULL
    , @tx_individual_declaration            VARCHAR(256)        = NULL
    , @tx_card_delivery_from                VARCHAR(256)        = NULL
    , @tx_declaration                       VARCHAR(256)        = NULL
    , @dec_auto_debit_req_min_amount        DECIMAL(20, 2)      = NULL
    , @tx_auto_debit_req_full_outstanding   VARCHAR(256)        = NULL
    , @tx_card_duplication_result           VARCHAR(1024)       = NULL
    , @tx_card_duplication_reason           VARCHAR(1024)       = NULL
    , @tx_un_sanction_result                VARCHAR(1024)       = NULL
    , @tx_un_sanction_reason                VARCHAR(1024)       = NULL
    , @tx_ofac_sanction_result              VARCHAR(1024)       = NULL
    , @tx_ofac_sanction_reason              VARCHAR(1024)       = NULL
    , @dec_applicant_asking_limit           DECIMAL(20, 2)      = NULL
    , @dec_max_allowd_limit                 DECIMAL(20, 2)      = NULL
    , @dec_approved_limit                   DECIMAL(20, 2)      = NULL
    , @dec_balance_transfer_request_amount  DECIMAL(20, 2)      = NULL
    , @dec_card_proposed_limit              DECIMAL(20, 2)      = NULL
    , @tx_proposed_billing_date             VARCHAR(256)        = NULL
    , @dec_minimum_payment                  DECIMAL(20, 2)      = NULL
    , @tx_bt_credit_card_outstanding        VARCHAR(256)        = NULL
    , @tx_kyc_level                         VARCHAR(256)        = NULL
    , @tx_auto_debit_amount                 VARCHAR(256)        = NULL
    , @dec_interest_rate                    DECIMAL(20, 2)      = NULL
    , @dt_cib_generation                    DATE                = NULL
    , @tx_cib_status                        VARCHAR(256)        = NULL
    , @dec_proposed_dbr                     DECIMAL(20, 2)      = NULL
    , @dec_net_monthly_income               DECIMAL(20, 2)      = NULL
    , @tx_current_type_based_on_card_nature VARCHAR(256)        = NULL
    , @tx_card_security_type                VARCHAR(256)        = NULL
    , @dec_allowed_muiltiplier              DECIMAL(20, 2)      = NULL
    , @dec_amout_deposite_cbbl              DECIMAL(20, 2)      = NULL
    , @dec_remaining_amount_after_paid_emi  DECIMAL(20, 2)      = NULL
    , @dec_disposable_income                DECIMAL(20, 2)      = NULL
    , @dec_existing_loan_emi                DECIMAL(20, 2)      = NULL
    , @dec_total_emi                        DECIMAL(20, 2)      = NULL
    , @tx_duplications                      VARCHAR(256)        = NULL
    , @tx_maximum_allowed_multiplier        VARCHAR(256)        = NULL
    , @dec_maximum_allowed_dbr              DECIMAL(20, 2)      = NULL
    , @dec_recommend_for_approval           DECIMAL(20, 2)      = NULL
    , @tx_bp_no                             VARCHAR(256)        = NULL
    , @tx_nid                               VARCHAR(256)        = NULL
    , @tx_mobile                            VARCHAR(256)        = NULL
    , @tx_from_date                         VARCHAR(256)        = NULL
    , @tx_to_date                           VARCHAR(256)        = NULL
    , @tx_sourcing_brc                      VARCHAR(256)        = NULL 
    , @tx_staff_id                          VARCHAR(256)        = NULL 
    , @id_legal_entity_key                  INT                 = NULL
    , @tx_ui_action_name                    VARCHAR(256)        = NULL
    , @tx_phone                             VARCHAR(256)        = NULL
    , @tx_concer_bank_name                  VARCHAR(256)        = NULL
    , @tx_bt_request                        VARCHAR(256)        = NULL
    , @tx_role_ids                          VARCHAR(256)        = NULL
    , @int_in_group                         INT                 = NULL
    , @tx_card_group_id                     VARCHAR(256)        = NULL
    , @id_card_group_creator_key            INT                 = NULL
    , @dtt_group_create                     DATETIME            = NULL
    , @l_tmp_card_state_key                 VARCHAR(48)         = NULL
    , @l_tmp_card_state_name                VARCHAR(48)         = NULL
    , @tx_duplication_areas                 VARCHAR(256)        = NULL
    , @dec_total_group_amount               DECIMAL(20,2)       = NULL
    , @total_loan_this_group                INT                 = NULL
    , @tx_value2                            VARCHAR(256)        = NULL
    , @tx_name_of_card                      VARCHAR(256)        = NULL
    , @tx_reference_name                        VARCHAR(256)    = NULL
    , @tx_relationship_with_applicant           VARCHAR(256)    = NULL            
    , @tx_reference_profesion                        VARCHAR(256)    = NULL
    , @tx_reference_name_of_organization        VARCHAR(256)    = NULL                
    , @tx_reference_designation                 VARCHAR(256)    = NULL        
    , @tx_reference_work_and_residence_address  VARCHAR(256)    = NULL                    
    , @tx_reference_telephone                   VARCHAR(256)    = NULL    
    , @tx_reference_mobile                      VARCHAR(256)    = NULL
    , @tx_reference_email                       VARCHAR(256)    = NULL
    , @tx_tin                                   VARCHAR(256)    = NULL
    , @tx_cib_report_status_list                VARCHAR(256)    = NULL

    _SP_PARAM_FOOTER

AS

{
    _SP_HEADER


    IF (@tx_action_name IN (_ACTION_NEW, _ACTION_UPDATE,'USER_CREATE','PRE_APPROVE'))
    {   
        _CHECK_STATE_TRANSITION('CREDIT_CARD')
    }

    IF ( @tx_action_name IN ('DELETE_FULL_CREDIT_CARD'))
    {
        UPDATE T_CREDIT_CARD
        SET id_credit_card_ver  = id_credit_card_ver + 1
        , is_active = 0
        WHERE id_credit_card_key = @_PRIMARY_KEY
         
        UPDATE  T_EXISTING_LIABILITY
        SET is_active = 0
        WHERE id_credit_card_key = @_PRIMARY_KEY

        UPDATE  T_DOCUMENT 
        SET is_active = 0
        WHERE id_ref_key = @_PRIMARY_KEY
        AND tx_object_type = 'CREDIT_CARD'
    }

    IF ( @tx_action_name = 'SELECT_CREDIT_CARD_FOR_GRID' or  @tx_action_name  = 'SEARCH_DATA_FOR_CC_GRID')
    {

        SELECT DISTINCT id_credit_card_key AS id_to_keep_distinct
        , L.*
        ,(
            CASE 
             WHEN (C.tx_customer_id='?')  THEN C.tx_cif 
               
             ELSE C.tx_customer_id
            END 
        ) as tx_customer_id 
        ,C.tx_bp_no 
        ,C.tx_customer_name 
        ,C.tx_designation 
        ,C.dtt_date_of_birth
        ,C.dtt_joining_date 
        ,C.tx_permanet_addr 
        ,C.tx_office_addr   
        ,C.tx_nid           
        ,C.tx_tin           
        ,C.tx_marital_status
        ,C.tx_mother_name   
        ,C.tx_father_name   
        ,C.tx_spouse  
        ,C.tx_service_length
        ,C.tx_mobile
        ,C.tx_district
        , C.tx_division
        , S.tx_state_name
        , S.tx_display_text as tx_state_display_label
        , T.tx_fsm_type_name
        INTO #TEMP_CARD_FOR_GRID
        FROM T_CREDIT_CARD L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'CREDIT_CARD'
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
       /* JOIN T_ROLE_STATE_MAP M ON M.id_fsm_state_key = S.id_fsm_state_key and M.is_active = 1
        JOIN T_ROLE R ON R.id_role_key = M.id_role_key
        WHERE
         R.id_role_key IN 
            (
                SELECT  R.id_role_key
                FROM    V_GROUP_ROLE    R
                JOIN    V_USER_GROUP    GRP ON GRP.id_group_key = R.id_group_key
                JOIN    T_USER  USR ON USR.id_user_key  = GRP.id_user_key
                WHERE   USR.id_user_key = @id_user_mod_key
                AND USR.is_active   = 1
                AND GRP.is_active   = 1
                AND R.is_active = 1
        )
        AND */ 
        WHERE L.tx_account_no = ISNULL(@tx_account_no ,L.tx_account_no)
        AND C.tx_bp_no        = ISNULL(@tx_bp_no      ,C.tx_bp_no)
        AND C.tx_nid          = ISNULL(@tx_nid        ,C.tx_nid)
        AND C.tx_mobile       = ISNULL(@tx_phone        ,C.tx_mobile)
        AND L.int_cc_tracking_number  = ISNULL(@int_cc_tracking_number        ,L.int_cc_tracking_number)
        AND L.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_create)
        AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_create)
        AND L.tx_application_number = ISNULL(@tx_application_number        ,L.tx_application_number)
        AND L.tx_data_source = ISNULL(@tx_data_source       ,L.tx_data_source)
        AND L.is_active     = 1
        ORDER BY L.dtt_mod DESC


        SELECT LG.*
        , LE.tx_legal_entity_name
        , USR.tx_login_name  AS tx_creator_name
        INTO #TEMP_CARD_FOR_GRID_3
        FROM #TEMP_CARD_FOR_GRID LG
        JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = LG.id_legal_entity_key
        JOIN T_USER USR ON USR.id_user_key = LG.id_creator_key

       SELECT tx_rs_type = 'RS_TYPE_CREDIT_CARD_FOR_GRID', * 
       , tx_state_display_label as tx_folder_name
       FROM #TEMP_CARD_FOR_GRID_3
       ORDER BY dtt_mod DESC
       
    }
    
    IF ( @tx_action_name = 'SELECT_FULL_CREDIT_CARD' )
    {   
        SELECT L.*
        INTO #TMP_CREDIT_CARD
        FROM T_CREDIT_CARD L
        WHERE id_credit_card_key = @_PRIMARY_KEY
        AND is_active = 1

        SELECT tx_rs_type = 'RS_TYPE_CREDIT_CARD' ,TL.*
        , C.tx_value1 AS tx_loan_type 
        , C.tx_value3 AS tx_loan_prefix 
        , S.tx_state_name
        , S.tx_display_text as tx_state_display_label
        FROM #TMP_CREDIT_CARD TL
        JOIN T_FSM_STATE S ON TL.id_state_key = S.id_fsm_state_key
        JOIN T_CONFIGURATION C ON C.id_configuration_key = TL.id_card_type_key

        SELECT @id_customer_key = (SELECT id_customer_key FROM #TMP_CREDIT_CARD)
         
        SELECT tx_rs_type = 'RS_TYPE_CUSTOMER' , C.* 
        FROM T_CUSTOMER C
        WHERE C.id_customer_key =  @id_customer_key
        AND C.is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_EXISTING_LIABILITY' , L.*
        FROM  T_EXISTING_LIABILITY L
        WHERE id_credit_card_key = @_PRIMARY_KEY
        AND   tx_object_type = 'CREDIT_CARD'
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_CIB_STATUS' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'CREDIT_CARD'
        AND tx_comment_type = 'CIB_STATUS'
        AND id_ref_key = @id_credit_card_key
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_ANALYSTS_COMMENTS' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'CREDIT_CARD'
        AND tx_comment_type = 'ANALYSTS_COMMENTS'
        AND id_ref_key = @id_credit_card_key
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_EXCEPTION_DETAILS' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'CREDIT_CARD'
        AND tx_comment_type = 'EXCEPTION_DETAILS'
        AND id_ref_key = @id_credit_card_key
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_INSTRUCTION_TO_CAD' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'CREDIT_CARD'
        AND tx_comment_type = 'INSTRUCTION_TO_CAD'
        AND id_ref_key = @id_credit_card_key
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_COMMENTS_JUSTIFICATION' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'CREDIT_CARD'
        AND tx_comment_type = 'COMMENTS_JUSTIFICATION'
        AND id_ref_key = @id_credit_card_key
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_COMMENTS_DEVIATION' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'CREDIT_CARD'
        AND tx_comment_type = 'COMMENTS_DEVIATION'
        AND id_ref_key = @id_credit_card_key
        AND is_active = 1             

        SELECT  tx_rs_type = 'RS_TYPE_BM_RECOMMENDATION' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'CREDIT_CARD'
        AND tx_comment_type = 'BM_RECOMMENDATION'
        AND id_ref_key = @id_credit_card_key
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_SO_RECOMMENDATION' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'CREDIT_CARD'
        AND tx_comment_type = 'SO_RECOMMENDATION'
        AND id_ref_key = @id_credit_card_key
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_CARD_DOCUMENT' , D.*
        FROM  T_DOCUMENT D
        WHERE id_ref_key = @id_credit_card_key
        AND tx_doc_type != 'CIB_STATUS'
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_CARD_DOC_CIB_STATUS' , D.*
        FROM  T_DOCUMENT D
        WHERE id_ref_key = @id_credit_card_key
        AND tx_doc_type = 'CIB_STATUS'
        AND is_active = 1

    } 
    
    IF ( @tx_action_name in( 'STATE_TRANSITION'))
    {
        set @tx_action_name = @tx_ui_action_name
        _CHECK_STATE_TRANSITION('CREDIT_CARD')

        IF(@tx_ui_action_name = 'RECEIVED' OR @tx_ui_action_name = 'PRE_APPROVE')
        {
            DECLARE @l_tx_app_id VARCHAR(16) 
            
            SELECT @l_tx_app_id = tx_application_number 
            FROM T_CREDIT_CARD
            WHERE id_credit_card_key = @id_credit_card_key 

            IF(@l_tx_app_id is NULl or @l_tx_app_id IN ('?', '') )
            {
                declare @l_Card_prefix varchar(4)
                -- get laon prefix from configuration      
                select @l_Card_prefix = tx_value3 from T_CONFIGURATION where id_configuration_key = @id_card_type_key
                set @tx_application_number = @l_Card_prefix + @tx_application_number
                
            }
        }
        IF(@tx_ui_action_name = 'PRE_APPROVE')
        {
            SET @dec_approved_limit = (SELECT dec_applied_amount FROM T_CREDIT_CARD WHERE id_credit_card_key =@id_credit_card_key)
        }

        IF(@dec_approved_limit is NULl)
        {
           SET @dec_approved_limit = -2147483648.00
        }

        UPDATE T_CREDIT_CARD
        SET id_credit_card_ver  = id_credit_card_ver + 1
        , dtt_mod = getdate()
        , id_user_mod_key  = @id_user_mod_key
        , tx_application_number = ISNULL(@tx_application_number, tx_application_number)
        , dec_approved_limit = @dec_approved_limit
        , id_state_key = @id_state_key
        , id_action_key = @id_action_key
        where id_credit_card_key = @id_credit_card_key

        DECLARE @file_count INT;
        SELECT @file_count = (SELECT COUNT(C.int_cc_tracking_number) FROM T_CREDIT_CARD C WHERE C.id_credit_card_key = @id_credit_card_key)
       
        IF(@file_count>0)
        BEGIN 
            SELECT  @l_tmp_card_state_key = (SELECT id_state_key FROM T_CREDIT_CARD WHERE id_credit_card_key = @id_credit_card_key)
            SELECT  @l_tmp_card_state_name = (SELECT tx_state_name FROM T_FSM_STATE WHERE id_fsm_state_key = @l_tmp_card_state_key)         

            UPDATE T_ACQUISITION_APPLICANT_DETAILS 
            SET id_acquisition_applicant_ver = id_acquisition_applicant_ver+1
            , int_card_state_id = @l_tmp_card_state_key
            , tx_card_state_name = @l_tmp_card_state_name
            WHERE id_credit_card_key = @id_credit_card_key
            AND is_active = 1
        END        

        set @tx_action_name = 'X_INGORE_ACTION'
    }

    IF((@tx_card_delivery_from IS NOT NULL))
    {
        DECLARE @sq  char(1) = ''''
        SELECT @tx_card_delivery_from = substring(@tx_card_delivery_from, 1, charindex(@sq + @sq, @tx_card_delivery_from)) +
                trim(@sq FROM substring(@tx_card_delivery_from, charindex(@sq + @sq, @tx_card_delivery_from) + 1, len(@tx_card_delivery_from)))
    }

    IF ( @tx_action_name IN( _ACTION_NEW, 'FO_CREATE', 'SAVE','USER_CREATE') )
    {   
        SELECT  LE.id_legal_entity_key AS id_legal_entity_key
        , LE.tx_legal_entity_name AS tx_sourcing_brc
        , U.tx_cbs_user_id AS tx_staff_id
        INTO #TEMP_CREATOR_INFO
        FROM T_USER U
        JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = U.id_legal_entity_key
        where U.id_user_key = @id_user_mod_key

        SET @id_legal_entity_key = (SELECT id_legal_entity_key FROM #TEMP_CREATOR_INFO)
        SET @tx_sourcing_branch = (SELECT tx_sourcing_brc FROM #TEMP_CREATOR_INFO)
        SET @tx_sourcing_staff_id = (SELECT tx_staff_id FROM #TEMP_CREATOR_INFO)

        INSERT INTO _TABLE_NAME
        (     
             _VERSION                   
            , _TABLE_HEADER_INS_FIELD_WITH_STATE
            
            , id_legal_entity_key
            , id_customer_key
            , id_creator_key
            , dtt_create
            , id_card_type_key
            , id_customer_type_key
            , tx_data_source
            , tx_account_no
            , tx_sourcing_branch
            , tx_sourcing_staff_id
            , tx_source_branch
            , tx_source_cse
            , tx_source_self_application
            , tx_source_others
            , int_cc_tracking_number 
            , tx_application_number  
            , tx_source_from
            , tx_card_monthly_bil_debited_from
            , dec_salary_deposited_last_month
            , dec_additional_income_amount
            , dec_after_cbbl_emi
            , dec_total_income
            , dec_total_emi_paid_in_cbbl
            , tx_auto_debit_req_minimum_amount
            , dec_remaining_emi
            , tx_additional_income_source
            , tx_value_of_security
            , tx_loan_to_value
            , tx_gpf_loan
            , dec_pre_approved_limit
            , dec_pre_approved_limit_lower
            , dec_pre_approved_limited_upper
            , dec_pre_approved_limit_range
            , dec_applied_card_min_bill
            , dec_applied_amount
            , tx_individual_declaration
            , tx_card_delivery_from
            , tx_declaration
            , dec_auto_debit_req_min_amount
            , tx_auto_debit_req_full_outstanding
            , tx_card_duplication_result
            , tx_card_duplication_reason
            , tx_un_sanction_result
            , tx_un_sanction_reason
            , tx_ofac_sanction_result
            , tx_ofac_sanction_reason
            , dec_applicant_asking_limit
            , dec_max_allowd_limit
            , dec_approved_limit
            , dec_balance_transfer_request_amount
            , dec_card_proposed_limit
            , tx_proposed_billing_date
            , dec_minimum_payment
            , tx_bt_credit_card_outstanding
            , tx_kyc_level
            , tx_auto_debit_amount
            , dec_interest_rate
            , dt_cib_generation
            , tx_cib_status
            , dec_proposed_dbr
            , dec_net_monthly_income
            , tx_current_type_based_on_card_nature
            , tx_card_security_type
            , dec_allowed_muiltiplier
            , dec_amout_deposite_cbbl
            , dec_remaining_amount_after_paid_emi
            , dec_disposable_income
            , dec_existing_loan_emi
            , dec_total_emi
            , tx_duplications
            , tx_maximum_allowed_multiplier
            , dec_maximum_allowed_dbr
            , dec_recommend_for_approval
            , tx_concer_bank_name
            , tx_bt_request
            , int_in_group
            , tx_card_group_id
            , id_card_group_creator_key
            , dtt_group_create
            , tx_duplication_areas
            , tx_name_of_card
            , tx_reference_name
            , tx_relationship_with_applicant
            , tx_reference_profesion
            , tx_reference_name_of_organization
            , tx_reference_designation
            , tx_reference_work_and_residence_address
            , tx_reference_telephone
            , tx_reference_mobile
            , tx_reference_email
            , tx_cib_report_status_list
        )
        VALUES
        (
            0
            , _TABLE_HEADER_INS_VAL_WITH_STATE

            , ISNULL(@id_legal_entity_key,_DB_NULL_INT)
            , ISNULL(@id_customer_key,_DB_NULL_INT)
            , ISNULL(@id_creator_key,_DB_NULL_INT)
            , ISNULL(@dtt_create,GETDATE())
            , ISNULL(@id_card_type_key,_DB_NULL_INT)
            , ISNULL(@id_customer_type_key,_DB_NULL_INT)
            , ISNULL(@tx_data_source,_DB_NULL_STR)
            , ISNULL(@tx_account_no,_DB_NULL_STR)
            , ISNULL(@tx_sourcing_branch,_DB_NULL_STR)
            , ISNULL(@tx_sourcing_staff_id,_DB_NULL_STR)
            , ISNULL(@tx_source_branch,_DB_NULL_STR)
            , ISNULL(@tx_source_cse,_DB_NULL_STR)
            , ISNULL(@tx_source_self_application,_DB_NULL_STR)
            , ISNULL(@tx_source_others,_DB_NULL_STR)
            , ISNULL(@int_cc_tracking_number ,_DB_NULL_INT)
            , ISNULL(@tx_application_number  ,_DB_NULL_STR)
            , ISNULL(@tx_source_from,_DB_NULL_STR)
            , ISNULL(@tx_card_monthly_bil_debited_from,_DB_NULL_STR)
            , ISNULL(@dec_salary_deposited_last_month,_DB_NULL_FLOAT)
            , ISNULL(@dec_additional_income_amount,_DB_NULL_FLOAT)
            , ISNULL(@dec_after_cbbl_emi,_DB_NULL_FLOAT)
            , ISNULL(@dec_total_income,_DB_NULL_FLOAT)
            , ISNULL(@dec_total_emi_paid_in_cbbl,_DB_NULL_FLOAT)
            , ISNULL(@tx_auto_debit_req_minimum_amount,_DB_NULL_STR)
            , ISNULL(@dec_remaining_emi,_DB_NULL_FLOAT)
            , ISNULL(@tx_additional_income_source,_DB_NULL_STR)
            , ISNULL(@tx_value_of_security,_DB_NULL_STR)
            , ISNULL(@tx_loan_to_value,_DB_NULL_STR)
            , ISNULL(@tx_gpf_loan,_DB_NULL_STR)
            , ISNULL(@dec_pre_approved_limit,_DB_NULL_FLOAT)
            , ISNULL(@dec_pre_approved_limit_lower,_DB_NULL_FLOAT)
            , ISNULL(@dec_pre_approved_limited_upper,_DB_NULL_FLOAT)
            , ISNULL(@dec_pre_approved_limit_range,_DB_NULL_FLOAT)
            , ISNULL(@dec_applied_card_min_bill,_DB_NULL_FLOAT)
            , ISNULL(@dec_applied_amount,_DB_NULL_FLOAT)
            , ISNULL(@tx_individual_declaration,_DB_NULL_STR)
            , ISNULL(@tx_card_delivery_from,_DB_NULL_STR)
            , ISNULL(@tx_declaration,_DB_NULL_STR)
            , ISNULL(@dec_auto_debit_req_min_amount,_DB_NULL_FLOAT)
            , ISNULL(@tx_auto_debit_req_full_outstanding,_DB_NULL_STR)
            , ISNULL(@tx_card_duplication_result,_DB_NULL_STR)
            , ISNULL(@tx_card_duplication_reason,_DB_NULL_STR)
            , ISNULL(@tx_un_sanction_result,_DB_NULL_STR)
            , ISNULL(@tx_un_sanction_reason,_DB_NULL_STR)
            , ISNULL(@tx_ofac_sanction_result,_DB_NULL_STR)
            , ISNULL(@tx_ofac_sanction_reason,_DB_NULL_STR)
            , ISNULL(@dec_applicant_asking_limit,_DB_NULL_FLOAT)
            , ISNULL(@dec_max_allowd_limit,_DB_NULL_FLOAT)
            , ISNULL(@dec_approved_limit,_DB_NULL_FLOAT)
            , ISNULL(@dec_balance_transfer_request_amount,_DB_NULL_FLOAT)
            , ISNULL(@dec_card_proposed_limit,_DB_NULL_FLOAT)
            , ISNULL(@tx_proposed_billing_date,_DB_NULL_STR)
            , ISNULL(@dec_minimum_payment,_DB_NULL_FLOAT)
            , ISNULL(@tx_bt_credit_card_outstanding,_DB_NULL_STR)
            , ISNULL(@tx_kyc_level,_DB_NULL_STR)
            , ISNULL(@tx_auto_debit_amount,_DB_NULL_STR)
            , ISNULL(@dec_interest_rate,_DB_NULL_FLOAT)
            , ISNULL(@dt_cib_generation,_DB_NULL_DATE)
            , ISNULL(@tx_cib_status,_DB_NULL_STR)
            , ISNULL(@dec_proposed_dbr,_DB_NULL_FLOAT)
            , ISNULL(@dec_net_monthly_income,_DB_NULL_FLOAT)
            , ISNULL(@tx_current_type_based_on_card_nature,_DB_NULL_STR)
            , ISNULL(@tx_card_security_type,_DB_NULL_STR)
            , ISNULL(@dec_allowed_muiltiplier,_DB_NULL_FLOAT)
            , ISNULL(@dec_amout_deposite_cbbl,_DB_NULL_FLOAT)
            , ISNULL(@dec_remaining_amount_after_paid_emi,_DB_NULL_FLOAT)
            , ISNULL(@dec_disposable_income,_DB_NULL_FLOAT)
            , ISNULL(@dec_existing_loan_emi,_DB_NULL_FLOAT)
            , ISNULL(@dec_total_emi,_DB_NULL_FLOAT)
            , ISNULL(@tx_duplications,_DB_NULL_STR)
            , ISNULL(@tx_maximum_allowed_multiplier,_DB_NULL_STR)
            , ISNULL(@dec_maximum_allowed_dbr,_DB_NULL_FLOAT)
            , ISNULL(@dec_recommend_for_approval,_DB_NULL_FLOAT)
            , ISNULL(@tx_concer_bank_name,_DB_NULL_STR)
            , ISNULL(@tx_bt_request,_DB_NULL_STR)
            , ISNULL(@int_in_group ,_DB_NULL_INT)
            , ISNULL(@tx_card_group_id,_DB_NULL_STR)
            , ISNULL(@id_card_group_creator_key,_DB_NULL_INT)
            , ISNULL(@dtt_group_create,_DB_NULL_DATE)
            , ISNULL(@tx_duplication_areas,_DB_NULL_STR)
            , ISNULL(@tx_name_of_card,_DB_NULL_STR)
            , ISNULL(@tx_reference_name ,_DB_NULL_STR)
            , ISNULL(@tx_relationship_with_applicant    ,_DB_NULL_STR)
            , ISNULL(@tx_reference_profesion ,_DB_NULL_STR)
            , ISNULL(@tx_reference_name_of_organization ,_DB_NULL_STR)
            , ISNULL(@tx_reference_designation  ,_DB_NULL_STR)
            , ISNULL(@tx_reference_work_and_residence_address   ,_DB_NULL_STR)
            , ISNULL(@tx_reference_telephone    ,_DB_NULL_STR)
            , ISNULL(@tx_reference_mobile   ,_DB_NULL_STR)
            , ISNULL(@tx_reference_email    ,_DB_NULL_STR)
            , ISNULL(@tx_cib_report_status_list    ,_DB_NULL_STR)
        )
        
        SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_CREDIT_CARD')

        UPDATE _TABLE_NAME
        SET _VERSION = _VERSION + 1
        , int_cc_tracking_number = @_PRIMARY_KEY
        where _PRIMARY_KEY = @_PRIMARY_KEY
    }

    IF ( @tx_action_name = _ACTION_SELECT )
    {
        SELECT  tx_rs_type = 'RS_TYPE_CREDIT_CARD'
        , L.*
        , S.tx_state_name
        , s.id_fsm_state_key as id_state_key
        , S.tx_display_text as tx_state_display_label
        FROM  _TABLE_NAME L
        JOIN T_FSM_STATE   S ON L.id_state_key = S.id_fsm_state_key
        WHERE  id_credit_card_key = ISNULL(@id_credit_card_key        ,id_credit_card_key)
        AND    tx_application_number  = ISNULL(@tx_application_number  ,tx_application_number)
        AND    L.is_active = 1
    }

    IF (@tx_action_name IN( _ACTION_DELETE))
    { 
        _SET_ACTION(_ACTION_UPDATE)
        , @is_active = 0
    }

    IF( @tx_action_name IN( _ACTION_UPDATE, 'FO_UPDATE','PRE_APPROVE') )
    {

        IF(@tx_action_name = 'PRE_APPROVE')
        {
            DECLARE @l_tx_app_id1 VARCHAR(16)
            
            SELECT @l_tx_app_id1 = tx_application_number 
            FROM T_CREDIT_CARD
            WHERE id_credit_card_key = @id_credit_card_key

            SELECT @id_card_type_key = id_card_type_key 
            FROM T_CREDIT_CARD
            WHERE id_credit_card_key = @id_credit_card_key

            IF(@l_tx_app_id1 is NULl or @l_tx_app_id1 IN ('?', '') )
            {
                declare @l_Card_prefix1 varchar(4)
                -- get card prefix from configuration      
                select @l_Card_prefix1 = tx_value3 from T_CONFIGURATION where id_configuration_key = @id_card_type_key
                set @tx_application_number = @l_Card_prefix1 + @tx_application_number               
            }
        }

        UPDATE _TABLE_NAME
        SET 
        _TABLE_HEADER_UPD_WITH_STATE
        , id_customer_key = ISNULL(@id_customer_key, id_customer_key)
        , id_creator_key = ISNULL(@id_creator_key, id_creator_key)
        , dtt_create = ISNULL(@dtt_create, dtt_create)
        , id_card_type_key = ISNULL(@id_card_type_key, id_card_type_key)
        , id_customer_type_key = ISNULL(@id_customer_type_key, id_customer_type_key)
        , tx_data_source = ISNULL(@tx_data_source, tx_data_source)
        , tx_account_no = ISNULL(@tx_account_no, tx_account_no)
        , tx_sourcing_branch = ISNULL(@tx_sourcing_branch, tx_sourcing_branch)
        , tx_sourcing_staff_id = ISNULL(@tx_sourcing_staff_id, tx_sourcing_staff_id)
        , tx_source_branch = ISNULL(@tx_source_branch, tx_source_branch)
        , tx_source_cse = ISNULL(@tx_source_cse, tx_source_cse)
        , tx_source_self_application = ISNULL(@tx_source_self_application, tx_source_self_application)
        , tx_source_others = ISNULL(@tx_source_others, tx_source_others)
        , int_cc_tracking_number  = ISNULL(@int_cc_tracking_number , int_cc_tracking_number )
        , tx_application_number   = ISNULL(@tx_application_number  , tx_application_number  )
        , tx_source_from = ISNULL(@tx_source_from, tx_source_from)
        , tx_card_monthly_bil_debited_from = ISNULL(@tx_card_monthly_bil_debited_from, tx_card_monthly_bil_debited_from)
        , dec_salary_deposited_last_month = ISNULL(@dec_salary_deposited_last_month, dec_salary_deposited_last_month)
        , dec_additional_income_amount = ISNULL(@dec_additional_income_amount, dec_additional_income_amount)
        , dec_after_cbbl_emi = ISNULL(@dec_after_cbbl_emi, dec_after_cbbl_emi)       
        , dec_total_income = ISNULL(@dec_total_income, dec_total_income)
        , dec_total_emi_paid_in_cbbl = ISNULL(@dec_total_emi_paid_in_cbbl, dec_total_emi_paid_in_cbbl)
        , tx_auto_debit_req_minimum_amount = ISNULL(@tx_auto_debit_req_minimum_amount, tx_auto_debit_req_minimum_amount)       
        , dec_remaining_emi = ISNULL(@dec_remaining_emi, dec_remaining_emi)
        , tx_additional_income_source = ISNULL(@tx_additional_income_source, tx_additional_income_source)
        , tx_value_of_security = ISNULL(@tx_value_of_security, tx_value_of_security)
        , tx_loan_to_value = ISNULL(@tx_loan_to_value, tx_loan_to_value)
        , tx_gpf_loan = ISNULL(@tx_gpf_loan, tx_gpf_loan)
        , dec_pre_approved_limit = ISNULL(@dec_pre_approved_limit, dec_pre_approved_limit)        
        , dec_pre_approved_limit_lower = ISNULL(@dec_pre_approved_limit_lower, dec_pre_approved_limit_lower)
        , dec_pre_approved_limited_upper = ISNULL(@dec_pre_approved_limited_upper, dec_pre_approved_limited_upper)
        , dec_pre_approved_limit_range = ISNULL(@dec_pre_approved_limit_range, dec_pre_approved_limit_range)       
        , dec_applied_card_min_bill = ISNULL(@dec_applied_card_min_bill, dec_applied_card_min_bill)
        , dec_applied_amount = ISNULL(@dec_applied_amount, dec_applied_amount)        
        , tx_individual_declaration = ISNULL(@tx_individual_declaration, tx_individual_declaration)
        , tx_card_delivery_from = ISNULL(@tx_card_delivery_from, tx_card_delivery_from)
        , tx_declaration = ISNULL(@tx_declaration, tx_declaration)
        , dec_auto_debit_req_min_amount = ISNULL(@dec_auto_debit_req_min_amount, dec_auto_debit_req_min_amount)
        , tx_auto_debit_req_full_outstanding = ISNULL(@tx_auto_debit_req_full_outstanding, tx_auto_debit_req_full_outstanding)
        , tx_card_duplication_result = ISNULL(@tx_card_duplication_result, tx_card_duplication_result)
        , tx_card_duplication_reason = ISNULL(@tx_card_duplication_reason, tx_card_duplication_reason)
        , tx_un_sanction_result = ISNULL(@tx_un_sanction_result, tx_un_sanction_result)
        , tx_un_sanction_reason = ISNULL(@tx_un_sanction_reason, tx_un_sanction_reason)
        , tx_ofac_sanction_result = ISNULL(@tx_ofac_sanction_result, tx_ofac_sanction_result)
        , tx_ofac_sanction_reason = ISNULL(@tx_ofac_sanction_reason, tx_ofac_sanction_reason)
        , dec_applicant_asking_limit = ISNULL(@dec_applicant_asking_limit, dec_applicant_asking_limit)
        , dec_max_allowd_limit = ISNULL(@dec_max_allowd_limit, dec_max_allowd_limit)
        , dec_approved_limit = ISNULL(@dec_approved_limit, dec_approved_limit)
        , dec_balance_transfer_request_amount = ISNULL(@dec_balance_transfer_request_amount, dec_balance_transfer_request_amount)        
        , dec_card_proposed_limit = ISNULL(@dec_card_proposed_limit, dec_card_proposed_limit)
        , tx_proposed_billing_date = ISNULL(@tx_proposed_billing_date, tx_proposed_billing_date)
        , dec_minimum_payment = ISNULL(@dec_minimum_payment, dec_minimum_payment)
        , tx_bt_credit_card_outstanding = ISNULL(@tx_bt_credit_card_outstanding, tx_bt_credit_card_outstanding)
        , tx_kyc_level = ISNULL(@tx_kyc_level, tx_kyc_level)
        , tx_auto_debit_amount = ISNULL(@tx_auto_debit_amount, tx_auto_debit_amount)
        , dec_interest_rate = ISNULL(@dec_interest_rate, dec_interest_rate)
        , dt_cib_generation = ISNULL(@dt_cib_generation, dt_cib_generation)
        , tx_cib_status = ISNULL(@tx_cib_status, tx_cib_status)
        , dec_proposed_dbr = ISNULL(@dec_proposed_dbr, dec_proposed_dbr)
        , dec_net_monthly_income = ISNULL(@dec_net_monthly_income, dec_net_monthly_income)
        , tx_current_type_based_on_card_nature = ISNULL(@tx_current_type_based_on_card_nature, tx_current_type_based_on_card_nature)
        , tx_card_security_type = ISNULL(@tx_card_security_type, tx_card_security_type)
        , dec_allowed_muiltiplier = ISNULL(@dec_allowed_muiltiplier, dec_allowed_muiltiplier)
        , dec_amout_deposite_cbbl = ISNULL(@dec_amout_deposite_cbbl, dec_amout_deposite_cbbl)
        , dec_remaining_amount_after_paid_emi = ISNULL(@dec_remaining_amount_after_paid_emi, dec_remaining_amount_after_paid_emi)
        , dec_disposable_income = ISNULL(@dec_disposable_income, dec_disposable_income)
        , dec_existing_loan_emi = ISNULL(@dec_existing_loan_emi, dec_existing_loan_emi)
        , dec_total_emi = ISNULL(@dec_total_emi, dec_total_emi)
        , tx_duplications = ISNULL(@tx_duplications, tx_duplications)
        , tx_maximum_allowed_multiplier = ISNULL(@tx_maximum_allowed_multiplier, tx_maximum_allowed_multiplier)
        , dec_maximum_allowed_dbr = ISNULL(@dec_maximum_allowed_dbr, dec_maximum_allowed_dbr)
        , dec_recommend_for_approval = ISNULL(@dec_recommend_for_approval, dec_recommend_for_approval)       
        , tx_concer_bank_name = ISNULL(@tx_concer_bank_name, tx_concer_bank_name)
        , tx_bt_request = ISNULL(@tx_bt_request, tx_bt_request)  
        , int_in_group = ISNULL(@int_in_group, int_in_group)
        , tx_card_group_id = ISNULL(@tx_card_group_id, tx_card_group_id)       
        , id_card_group_creator_key = ISNULL(@id_card_group_creator_key, id_card_group_creator_key)
        , dtt_group_create = ISNULL(@dtt_group_create, dtt_group_create)      
        , tx_duplication_areas = ISNULL(@tx_duplication_areas, tx_duplication_areas)
        , tx_name_of_card = ISNULL(@tx_name_of_card, tx_name_of_card)
        , tx_reference_name = ISNULL(@tx_reference_name, tx_reference_name)
        , tx_relationship_with_applicant = ISNULL(@tx_relationship_with_applicant, tx_relationship_with_applicant)
        , tx_reference_profesion = ISNULL(@tx_reference_profesion, tx_reference_profesion)
        , tx_reference_name_of_organization = ISNULL(@tx_reference_name_of_organization, tx_reference_name_of_organization)
        , tx_reference_designation = ISNULL(@tx_reference_designation, tx_reference_designation)
        , tx_reference_work_and_residence_address = ISNULL(@tx_reference_work_and_residence_address, tx_reference_work_and_residence_address)
        , tx_reference_telephone = ISNULL(@tx_reference_telephone, tx_reference_telephone)
        , tx_reference_mobile = ISNULL(@tx_reference_mobile, tx_reference_mobile)
        , tx_reference_email = ISNULL(@tx_reference_email, tx_reference_email)    
        , tx_cib_report_status_list = ISNULL(@tx_cib_report_status_list, tx_cib_report_status_list)    
        WHERE   id_credit_card_key             = @id_credit_card_key
        AND     is_active = 1

        DECLARE @file_count1 INT;
        SELECT @file_count1 = (SELECT COUNT(C.int_cc_tracking_number) FROM T_CREDIT_CARD C WHERE C.id_credit_card_key = @id_credit_card_key)
       
        IF(@file_count1>0)
        BEGIN 
            SELECT  @l_tmp_card_state_key = (SELECT id_state_key FROM T_CREDIT_CARD WHERE id_credit_card_key = @id_credit_card_key)
            SELECT  @l_tmp_card_state_name = (SELECT tx_state_name FROM T_FSM_STATE WHERE id_fsm_state_key = @l_tmp_card_state_key)         

            UPDATE T_ACQUISITION_APPLICANT_DETAILS 
            SET id_acquisition_applicant_ver = id_acquisition_applicant_ver+1
            , int_card_state_id = @l_tmp_card_state_key
            , tx_card_state_name = @l_tmp_card_state_name
            WHERE id_credit_card_key = @id_credit_card_key
            AND is_active = 1
        END 
    }
    IF ( @tx_action_name = 'SELECT_CARD_WORK_HISTORY')
    {
        SELECT L.*
            , C.tx_customer_id 
            , C.tx_bp_no 
            , C.tx_customer_name 
            , C.tx_designation 
            , C.dtt_date_of_birth
            , C.dtt_joining_date 
            , C.tx_permanet_addr 
            , C.tx_office_addr   
            , C.tx_nid           
            , C.tx_tin           
            , C.tx_marital_status
            , C.tx_mother_name   
            , C.tx_father_name   
            , C.tx_spouse
            , S.tx_state_name
            , S.tx_display_text AS tx_state_display_label
            , S.tx_display_text AS tx_folder_name
            , T.tx_fsm_type_name 
            , A.tx_action_name
            , U.tx_login_name
        INTO #TEMP_CARD_HISTORY
        FROM T_CREDIT_CARD_AUDIT  L
        JOIN T_CREDIT_CARD_AUDIT   L2 ON L2.id_credit_card_key        =   L.id_credit_card_key
                            AND L2.id_credit_card_ver          >=  L.id_credit_card_ver
        JOIN T_FSM_STATE    S ON L.id_state_key         = S.id_fsm_state_key
        JOIN T_FSM_TYPE     T ON S.id_fsm_type_key      = T.id_fsm_type_key 
                            AND T.tx_fsm_type_name      = 'CREDIT_CARD'
        JOIN T_CUSTOMER     C ON C.id_customer_key      = L.id_customer_key 
        JOIN T_FSM_ACTION   A ON A.id_fsm_action_key    =  L.id_action_key
        JOIN T_USER         U ON U.id_user_key          = L.id_user_mod_key
        WHERE L.id_user_mod_key                         = @id_user_mod_key
        AND L.dtt_mod                                   >= CAST(@tx_from_date AS DATE)
        AND CAST(L.dtt_mod AS DATE)                     <= CAST(@tx_to_date AS DATE)
        ORDER BY L.dtt_mod

        SELECT tx_rs_type = 'RS_TYPE_CARD_WORK_HISTORY'
            , H.* 
            , S.tx_display_text     AS tx_current_state_name
            , u.tx_login_name       AS tx_creator_name
        FROM #TEMP_CARD_HISTORY H
        JOIN T_CREDIT_CARD             L ON L.id_credit_card_key      = H.id_credit_card_key
        JOIN T_FSM_STATE        S ON L.id_state_key     = S.id_fsm_state_key
        JOIN T_FSM_TYPE         T ON S.id_fsm_type_key  = T.id_fsm_type_key 
                                AND T.tx_fsm_type_name  = 'CREDIT_CARD'
        JOIN T_USER             U ON U.id_user_key      = H.id_creator_key   
    }
    
    IF ( @tx_action_name = 'SELECT_RECOMMEND_TO_ROLE' )
    {

        DECLARE @l_id_state_key INT = (SELECT id_state_key FROM T_CREDIT_CARD where id_credit_card_key = @id_credit_card_key)


        SELECT LineNumber = [Index], id_from_role_key = Item
        INTO #TMP_FROM_ROLE_ID_RECOMMEND
        FROM dbo.SplitStrings_Ordered(@tx_role_ids, ',') AS x;

        SELECT    tx_rs_type = 'RS_TYPE_ROLE'   
        , R.*
        FROM    T_ROLE    R
        WHERE R.id_role_key IN 
        (
            SELECT  id_role_key
            FROM    T_STATE_RECOMMEND_RETURN_MAP
            WHERE   id_fsm_state_key = @l_id_state_key
            AND     int_recommend = 1
            AND     is_active   = 1
            and     id_from_role_key in(
                select id_from_role_key from #TMP_FROM_ROLE_ID_RECOMMEND
            )
        )
        AND R.is_active = 1

    }
    IF ( @tx_action_name = 'SELECT_RETURN_TO_ROLE' )
    {

        DECLARE @l_id_state_key_2 INT = (SELECT id_state_key FROM T_CREDIT_CARD where id_credit_card_key = @id_credit_card_key)

        SELECT LineNumber = [Index], id_from_role_key = Item
        INTO #TMP_FROM_ROLE_ID_RETURN
        FROM dbo.SplitStrings_Ordered(@tx_role_ids, ',') AS x;

        SELECT    tx_rs_type = 'RS_TYPE_ROLE'   
        , R.*
        FROM    T_ROLE    R
        WHERE R.id_role_key IN 
        (
            SELECT  id_role_key
            FROM    T_STATE_RECOMMEND_RETURN_MAP
            WHERE   id_fsm_state_key = @l_id_state_key_2
            AND     int_return = 1
            AND     is_active   = 1
            and     id_from_role_key in(
                select id_from_role_key from #TMP_FROM_ROLE_ID_RETURN
            )
        )
        AND R.is_active = 1       
    }
    IF ( (@tx_action_name = 'CREATE_CARD_GROUP') OR (@tx_action_name = 'ADD_CARD_TO_CARD_GROUP'))
    {
     
        SELECT  @l_tmp_card_state_key = (SELECT id_state_key FROM T_CREDIT_CARD WHERE id_credit_card_key = @id_credit_card_key)
        SELECT  @l_tmp_card_state_name = (SELECT tx_state_name FROM T_FSM_STATE WHERE id_fsm_state_key = @l_tmp_card_state_key)         

        UPDATE      T_CREDIT_CARD 
        SET id_credit_card_ver  = id_credit_card_ver + 1
        , tx_card_group_id = @tx_card_group_id
        , id_card_group_creator_key = @id_user_mod_key 
        , dtt_group_create= GETDATE()
        , int_in_group = 1
        WHERE       id_credit_card_key = @id_credit_card_key 
        AND         @l_tmp_card_state_name IN ('HOCRM_APPROVE', 'UH_APPROVE','RM_APPROVE','PRE_APPROVED')

        SELECT  @dec_total_group_amount = (SELECT SUM(CASE 
                WHEN (T.dec_approved_limit =-2147483648.00)  THEN 0 
                  
                   ELSE T.dec_approved_limit
                END
                ) AS TotalAmount

                FROM T_CREDIT_CARD T
                WHERE tx_card_group_id = @tx_card_group_id )

        SELECT  @total_loan_this_group = (SELECT COUNT(tx_card_group_id) AS total_loan_this_group
                FROM T_CREDIT_CARD T
                WHERE tx_card_group_id = @tx_card_group_id)

        UPDATE T_LOAN_GROUP 
        SET id_loan_group_ver = id_loan_group_ver +1
        , dec_total_group_amount = @dec_total_group_amount
        , total_loan_this_group  = @total_loan_this_group
        WHERE tx_card_group_id = @tx_card_group_id
      
    }

    IF(@tx_action_name = 'SELECT_ALL_CARD_GROUP_DATA' OR @tx_action_name = 'SEARCH_CARD_GROUP_DATA')
    {

        SELECT tx_rs_type = 'RS_TYPE_CARD_GROUP_FOR_GRID'
            , L.*
            , S.tx_state_name
            , S.id_fsm_state_key as id_group_state_key
            , S.tx_display_text as tx_state_display_label
            , T.tx_fsm_type_name
            , USR.tx_login_name  AS tx_creator_name
            , L.tx_card_group_id as tx_folder_name
        FROM T_LOAN_GROUP L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'CREDIT_CARD'
        JOIN T_USER USR ON USR.id_user_key = L.id_user_mod_key
        WHERE  L.dtt_group_create      >= ISNULL(CAST(@tx_from_date AS DATE) , L.dtt_group_create)
        AND CAST(L.dtt_group_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_group_create)
        AND L.tx_card_group_id = ISNULL(@tx_card_group_id, L.tx_card_group_id)
        AND S.tx_state_name    = ISNULL(@tx_state_name, S.tx_state_name) 
        AND L.tx_card_group_id IS NOT NULL 
        AND L.tx_card_group_id NOT IN ('', '?')
        AND L.total_loan_this_group !=0
        AND L.is_active     = 1
        ORDER BY L.dtt_mod, L.tx_card_group_id DESC
    }

    IF(@tx_action_name = 'SELECT_FOR_ADD_TO_CARD_GROUP')
    {
        
        if(@tx_value2 = 'CARD_OFFICER')
        {
            SELECT tx_rs_type = 'RS_TYPE_CARD_GROUP_FOR_GRID' 
            , L.*
            , C.*       
            , C.tx_district
            , C.tx_division 
            , S.tx_state_name
            , S.tx_display_text as tx_state_display_label
            , T.tx_fsm_type_name
            , LE.tx_legal_entity_name
            , USR.tx_login_name  AS tx_creator_name
            FROM T_CREDIT_CARD L
            JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
            JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'CREDIT_CARD'
            JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
            JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = L.id_legal_entity_key
            JOIN T_USER USR ON USR.id_user_key = L.id_creator_key
            WHERE L.int_cc_tracking_number  = ISNULL(@int_cc_tracking_number        ,L.int_cc_tracking_number)
            AND L.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_create)
            AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_create)
            AND (L.tx_card_group_id IS NULL OR L.tx_card_group_id IN ('', '?') )
            AND S.tx_state_name IN ('PRE_APPROVED')
            AND L.is_active     = 1
            ORDER BY L.dtt_mod, L.tx_card_group_id DESC 
        }
        else
        {
            SELECT tx_rs_type = 'RS_TYPE_CARD_GROUP_FOR_GRID' 
            , L.*
            , C.*       
            , C.tx_district
            , C.tx_division 
            , S.tx_state_name
            , S.tx_display_text as tx_state_display_label
            , T.tx_fsm_type_name
            , LE.tx_legal_entity_name
            , USR.tx_login_name  AS tx_creator_name
            FROM T_CREDIT_CARD L
            JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
            JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'CREDIT_CARD'
            JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
            JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = L.id_legal_entity_key
            JOIN T_USER USR ON USR.id_user_key = L.id_creator_key
            WHERE L.int_cc_tracking_number  = ISNULL(@int_cc_tracking_number        ,L.int_cc_tracking_number)
            AND L.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_create)
            AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_create)
            AND (L.tx_card_group_id IS NULL OR L.tx_card_group_id IN ('', '?') )
            AND S.tx_state_name IN ('HOCRM_APPROVE', 'UH_APPROVE','RM_APPROVE')
            AND L.is_active     = 1
            ORDER BY L.dtt_mod, L.tx_card_group_id DESC 
        }
    }

    IF ( @tx_action_name = 'REMOVE_CARD_FROM_CARD_GROUP' )
    {

        SELECT  @l_tmp_card_state_key = (SELECT id_state_key FROM T_CREDIT_CARD WHERE id_credit_card_key = @id_credit_card_key)
        SELECT  @l_tmp_card_state_name = (SELECT tx_state_name FROM T_FSM_STATE WHERE id_fsm_state_key = @l_tmp_card_state_key)

        UPDATE      T_CREDIT_CARD 
        SET id_credit_card_ver  = id_credit_card_ver + 1  
        , tx_card_group_id = '?'
        , id_card_group_creator_key = -2147483648 
        , int_in_group = 2
        WHERE       id_credit_card_key = @id_credit_card_key
        AND         tx_card_group_id = @tx_card_group_id
        AND         @l_tmp_card_state_name IN ('HOCRM_APPROVE', 'UH_APPROVE','RM_APPROVE','PRE_APPROVED')

        SELECT  @dec_total_group_amount = (SELECT SUM(CASE 
                 WHEN (T.dec_approved_limit =-2147483648.00)  THEN 0 
                   
                    ELSE T.dec_approved_limit
                 END
                 ) AS TotalAmount

                 FROM T_CREDIT_CARD T
                 WHERE tx_card_group_id = @tx_card_group_id )

        SELECT  @total_loan_this_group = (SELECT COUNT(tx_card_group_id) AS total_loan_this_group
                FROM T_CREDIT_CARD T
                WHERE tx_card_group_id = @tx_card_group_id)

        UPDATE T_LOAN_GROUP 
        SET id_loan_group_ver = id_loan_group_ver +1
        , dec_total_group_amount = @dec_total_group_amount
        , total_loan_this_group  = @total_loan_this_group
        WHERE tx_card_group_id = @tx_card_group_id  
    }
    IF(@tx_action_name = 'SELECT_ECARD_GRID_DATA')
    {
        SELECT  tx_rs_type = 'RS_TYPE_CREDIT_CARD_FOR_GRID'
        , L.*
        ,C.tx_bp_no 
        ,C.tx_customer_name 
        ,C.tx_designation 
        ,C.dtt_date_of_birth
        ,C.dtt_joining_date 
        ,C.tx_permanet_addr 
        ,C.tx_office_addr   
        ,C.tx_nid           
        ,C.tx_tin           
        ,C.tx_marital_status
        ,C.tx_mother_name   
        ,C.tx_father_name   
        ,C.tx_spouse  
        ,C.tx_service_length
        ,C.tx_mobile
        ,C.tx_district
        , C.tx_division
        , S.tx_state_name
        , S.tx_display_text as tx_state_display_label
        , T.tx_fsm_type_name
        FROM T_CREDIT_CARD L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'CREDIT_CARD'
        JOIN T_USER  USR ON USR.id_user_key  = L.id_creator_key
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        WHERE   USR.id_user_key = @id_user_mod_key
        AND L.is_active     = 1
        ORDER BY L.dtt_create DESC
    }
    IF ( @tx_action_name = 'LOAD_DATA_SOURCE' )
    {
        SELECT DISTINCT tx_rs_type = 'RS_TYPE_DATA_SOURCE',  tx_data_source FROM T_CREDIT_CARD
    }
    IF(@tx_action_name = 'SELECT_CARD_FROM_GROUP')
    {
        SELECT tx_rs_type = 'RS_TYPE_CARD_GROUP_FOR_GRID' 
            , L.*
            , C.*       
            , C.tx_district
            , C.tx_division 
            , S.tx_state_name
            , S.tx_display_text as tx_state_display_label
            , T.tx_fsm_type_name
            , LE.tx_legal_entity_name
            , USR.tx_login_name  AS tx_creator_name
            , LG.id_state_key as id_group_state_key
        FROM T_CREDIT_CARD L
        JOIN  T_LOAN_GROUP LG ON LG.tx_card_group_id = L.tx_card_group_id
        JOIN T_FSM_STATE S ON LG.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'CREDIT_CARD'
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = L.id_legal_entity_key
        JOIN T_USER USR ON USR.id_user_key = L.id_creator_key
        JOIN T_USER U ON U.id_user_key = L.id_card_group_creator_key
        WHERE L.tx_card_group_id  = ISNULL(@tx_card_group_id        ,L.tx_card_group_id)
        AND L.is_active     = 1
        ORDER BY L.dtt_mod, L.tx_card_group_id DESC 
    }
    IF(@tx_action_name = 'LOAN_GROUP_COMMENTS_VIEW')
    {
        SELECT DISTINCT tx_rs_type = 'RS_TYPE_LOAN_GROUP_COMMENT'        
         , LG.tx_cad_comment
         , LG.tx_ho_crm_comment
         , LG.tx_loan_group_id
         , ST.tx_state_name
         , ST.tx_display_text
        FROM T_LOAN_GROUP LG 
        JOIN T_FSM_STATE ST ON ST.id_fsm_state_key = LG.id_state_key
        where LG.tx_card_group_id = @tx_card_group_id;
    }
    IF(@tx_action_name = 'SELECT_PRE_APPROVAL_LIMIT')
    {
        SELECT DISTINCT tx_rs_type = 'RS_TYPE_APPROVAL_LIMIT'        
         , C.*
        FROM T_CONFIGURATION C 
        where C.tx_value2 = @tx_value2;
    }
    IF(@tx_action_name = 'SELECT_CREDIT_CARD_DETAILS')
    {
        SELECT CC.*
        , CG.tx_value1 AS tx_credit_card_type
        INTO #TEMP_CARD_DETAILS_ACQ
        FROM T_CREDIT_CARD CC
        JOIN T_CONFIGURATION CG ON CG.id_configuration_key = CC.id_card_type_key
        WHERE id_credit_card_key = @id_credit_card_key

        SELECT tx_rs_type = 'RS_TYPE_CREDIT_CARD_DETAILS'
        , CC.*
        , FS.*
        FROM #TEMP_CARD_DETAILS_ACQ CC
        JOIN T_FSM_STATE FS ON Fs.id_fsm_state_key = CC.id_state_key

        SELECT tx_rs_type = 'RS_TYPE_CUSTOMER'
        , C.*
        FROM #TEMP_CARD_DETAILS_ACQ CT
        JOIN T_CUSTOMER C ON C.id_customer_key = CT.id_customer_key
    }

    IF(@tx_action_name = 'SELECT_FOR_DUPLICATE_CHECK')
    { 
        SELECT  C.tx_nid
        , C.tx_tin
        , C.tx_bp_no
        , L.tx_account_no
        INTO #TEMP_CUST_DATA
        FROM T_CREDIT_CARD L
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key
        WHERE L.id_credit_card_key = @id_credit_card_key
        AND L.is_active = 1
        AND L.is_active = 1

        SET @tx_account_no  = (SELECT  tx_account_no FROM #TEMP_CUST_DATA);
        SET @tx_nid         = (SELECT  tx_nid        FROM #TEMP_CUST_DATA);
        SET @tx_tin         = (SELECT  tx_tin        FROM #TEMP_CUST_DATA);
        SET @tx_bp_no       = (SELECT  tx_bp_no      FROM #TEMP_CUST_DATA);

        IF(@id_credit_card_key IS NOT NULL)
        {
          _SET_ACTION('SELECT_CUTOMER_ALL_LOAN')
          --or
          --SELECT  @tx_action_name = 'SELECT_CUTOMER_ALL_LOAN';
        }
    }
    IF(@tx_action_name = 'SELECT_CUTOMER_ALL_LOAN')
    {
        SELECT  tx_rs_type = 'RS_TYPE_CUSTOMER_LOAN_DUPLICATE_DATA'
        ,   FS.tx_state_name AS tx_status
        ,   L.id_loan_key AS int_loan_id
        ,   L.tx_loan_tracking_id AS tx_tracking_number
        ,   L.dtt_mod AS dtt_status_date
        ,   L.dec_recommended_for_approval AS dec_approved_amount
        ,   L.dec_total_emi AS dec_emi_size
        ,   CI.tx_value1 AS tx_product
        FROM T_LOAN         L
        JOIN T_CUSTOMER     C   ON C.id_customer_key    = L.id_customer_key
        JOIN T_FSM_STATE    FS  ON FS.id_fsm_state_key  = L.id_state_key
        JOIN T_CONFIGURATION CI ON CI.id_configuration_key = L.id_loan_type_key
        WHERE FS.tx_state_name  IN('RM_APPROVED', 'UH_APPROVED','HOCRM_APPROVED')
        AND L.tx_account_no     = ISNULL(@tx_account_no     ,L.tx_account_no)
        AND C.tx_bp_no          = ISNULL(@tx_bp_no          ,C.tx_bp_no)
        AND C.tx_nid            = ISNULL(@tx_nid            ,C.tx_nid)
        AND C.tx_tin            = ISNULL(@tx_tin            ,C.tx_tin)
        AND L.is_active         = 1
        AND C.is_active         = 1

        SELECT  tx_rs_type = 'RS_TYPE_CUSTOMER_CARD_DUPLICATE_DATA'
        ,   FS.tx_state_name AS tx_status
        ,   L.id_credit_card_key AS int_credit_card_id
        ,   STR(L.int_cc_tracking_number) AS tx_tracking_number
        ,   L.dtt_mod AS dtt_status_date
        ,   L.dec_approved_limit AS dec_approved_amount
        ,   L.dec_total_emi AS dec_emi_size
        ,   CI.tx_value1 AS tx_product
        FROM T_CREDIT_CARD      L
        JOIN T_CUSTOMER         C ON C.id_customer_key  = L.id_customer_key
        JOIN T_FSM_STATE FS ON  FS.id_fsm_state_key     = L.id_state_key
        JOIN T_CONFIGURATION CI ON CI.id_configuration_key = L.id_card_type_key
        WHERE FS.tx_state_name  IN('PRE_APPROVED', 'HOCRM_APPROVE','RM_APPROVE','UH_APPROVE')
        AND L.id_credit_card_key != ISNULL(@id_credit_card_key , L.id_credit_card_key)
        AND L.tx_account_no     = ISNULL(@tx_account_no ,L.tx_account_no)
        AND C.tx_bp_no          = ISNULL(@tx_bp_no      ,C.tx_bp_no)
        AND C.tx_nid            = ISNULL(@tx_nid        ,C.tx_nid)
        AND C.tx_tin            = ISNULL(@tx_tin        ,C.tx_tin)
        AND L.is_active         = 1
        AND C.is_active         = 1
    }
    IF ( @tx_action_name = 'CIB_STATUS_UPDATE') 
    {
        SELECT @dt_cib_generation = GETDATE()
        UPDATE      T_CREDIT_CARD
        SET id_credit_card_ver  = id_credit_card_ver + 1 
        , dt_cib_generation = @dt_cib_generation
        , dtt_mod = @dt_cib_generation
        , tx_cib_report_status_list              = ISNULL(@tx_cib_report_status_list              ,tx_cib_report_status_list)
       

        WHERE       id_credit_card_key = @id_credit_card_key
    }
    IF ( @tx_action_name = 'SELECT_ACQUISITION_DATA') 
    {
         SELECT tx_rs_type = 'RS_TYPE_ACQUISITION_DATA'
        , AAD.* 
        , tx_card_state_name as tx_folder_name
        FROM T_ACQUISITION_APPLICANT_DETAILS AAD
        WHERE AAD.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,AAD.dtt_create)
        AND CAST(AAD.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,AAD.dtt_create)
        AND AAD.id_credit_card_key       = ISNULL(@id_credit_card_key        ,AAD.id_credit_card_key)
        AND AAD.is_active     = 1
        ORDER BY dtt_mod DESC
    }    
    _SP_FOOTER
}
go

_GRANT_PERM_SP