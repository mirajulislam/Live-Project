/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 24 DEC 2019
* Description   : 
*****************************************************************************************/
    

EXEC DROP_db_object @tx_db_object_type = 'P', @tx_db_object_name = 'ACT_credit_card'
    go

IF ('CREATE' = 'CREATE')
        PRINT '**** WARNING : CREATING SP ****'
    ELSE IF ('CREATE' = 'ALTER')
        PRINT '**** WARNING : ALTER SP ****'
    ELSE
        PRINT '**** WARNING : UNKNOWN TABLE PROC ****'
    go

    CREATE PROC ACT_credit_card
    
    @tx_action_name     varchar(32)     = NULL  OUTPUT

    , @is_active            int                     = 1
    , @id_env_key           int                     = NULL  OUTPUT
    , @id_user_mod_key      int                     = NULL  OUTPUT
    , @dtt_mod              datetime                = NULL  OUTPUT

    , @id_state_key         int                     = NULL  OUTPUT
    , @tx_state_name        varchar(64) = NULL  OUTPUT
    , @id_action_key        int                     = NULL  OUTPUT

    , @id_event_key         int                     = NULL  OUTPUT
    , @id_event_map1_key    int                     = NULL  OUTPUT
    , @id_event_map2_key    int                     = NULL  OUTPUT
    , @id_event_map3_key    int                     = NULL  OUTPUT
    , @id_event_map4_key    int                     = NULL  OUTPUT

    , @dtt_valid_from       datetime                = NULL
    , @dtt_valid_to         datetime                = NULL
    , @dtt_as_at            datetime                = NULL
    , @dtt_last_refresh     datetime                = NULL

    , @id_credit_card_key                         INT                    = NULL       OUTPUT
    , @id_credit_card_ver                             INT                    = NULL   

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

    , @is_sel_data          int                     = NULL
    , @tx_log_level         varchar(32)         = NULL
    , @id_log_level         int                     = NULL
    , @is_record_time       bit                     = NULL
    , @is_print_msg         bit                     = NULL
    , @is_persist_msg       bit                     = NULL
    , @tx_json_log_msg      varchar(MAX)    = NULL      OUTPUT

AS

BEGIN
    -- GLOBAL VARS --
    DECLARE   @g_tx_action_name_orig    varchar(32)
            , @g_tx_state_name_orig     varchar(64)

            , @g_id_env_key             int
            , @g_tx_env_name            varchar(256)

            , @g_ct_row                 int
            , @g_id_return_status       int

            , @g_id_error_key           int
            , @g_tx_err_msg             varchar(1024)
            , @g_tx_err_msg_tmp         varchar(1024)
            , @g_is_outer_sp            bit

    DECLARE   @g_dt_sys_today           date
            , @g_dt_sys_prev_day        date
            , @g_dt_sys_next_day        date
            , @g_dt_sys_prev_biz_day    date
            , @g_dt_sys_next_biz_day    date

    

    --  DECLARE @g_in_tran      int
    DECLARE @g_is_ext_txn   bit
    DECLARE @g_is_sp_txn    bit

    SELECT @g_is_ext_txn = 0, @g_is_sp_txn = 0

    DECLARE @g_tmp_int      int

    DECLARE   @g_dtt_log            datetime
            , @g_tx_tmp_log_msg     varchar(MAX)
            , @g_tx_log_msg         varchar(MAX)

            , @g_id_err_num         int
            , @g_id_err_sev         int
            , @g_id_err_state       int
            , @g_tx_sp_name         varchar(128)
            , @g_id_line_num        int
            , @g_id_log_level       int

            , @g_is_record_time     bit
            , @g_is_print_msg       bit
            , @g_is_persist_msg     bit

            , @g_tx_json_log_msg    varchar(MAX)

    SELECT  @g_tx_json_log_msg = ''

    DECLARE @g_dtt_proc_start       datetime
    DECLARE @g_dtt_proc_end         datetime
    DECLARE @g_dtt_tot_elapsed      int

    DECLARE @g_dtt_query_start      datetime
    DECLARE @g_dtt_query_end        datetime
    DECLARE @g_dtt_query_elapsed    int

    DECLARE @g_tmp_tx_tot_time      varchar(255)
    DECLARE @g_tmp_tx_query_time    varchar(255)

    IF ( (@@NESTLEVEL = 1) )
    BEGIN
        IF ( ((@@OPTIONS & 2) != 2) AND (@@TRANCOUNT = 0) )
        BEGIN
            SELECT @g_is_ext_txn = 0
        END
        ELSE
        BEGIN
            SELECT @g_is_ext_txn = 1
        END
    END

    IF (((@tx_log_level IS NULL) OR (@tx_log_level = '?')) OR ((@is_persist_msg IS NULL) OR (@is_persist_msg = -2147483648)) OR ((@is_record_time IS NULL) OR (@is_record_time = -2147483648)))
    BEGIN
        EXEC @g_id_return_status = GET_sp_log_level @tx_sp_name='ACT_credit_card', @tx_log_level=@tx_log_level OUTPUT, @id_log_level=@id_log_level OUTPUT, @is_record_time=@is_record_time OUTPUT, @is_print_msg=@is_print_msg OUTPUT, @is_persist_msg=@is_persist_msg OUTPUT
    END

    SELECT @g_is_record_time = @is_record_time, @g_is_print_msg = @is_print_msg, @g_is_persist_msg  = @is_persist_msg, @g_id_log_level = @id_log_level

    SELECT @g_tx_err_msg = 'Entering[ACT_credit_card] : @tx_action[' + ISNULL(@tx_action_name, '?') + ']'
    SELECT @g_dtt_log = GETDATE(), @g_tx_sp_name = 'ACT_credit_card.sp', @g_id_line_num = 247

    -- TODO_H : [Naz] Move to Function

    IF ( NOT (((@g_id_log_level IS NULL) OR (@g_id_log_level = -2147483648))) )
    BEGIN
        IF (2 >= @g_id_log_level)
        BEGIN
            IF (@g_is_print_msg = 1)
            BEGIN
                SELECT @g_tx_tmp_log_msg = '[' + @g_tx_sp_name + ':' + convert(varchar, @g_id_line_num) + '] | ' + convert(varchar, @g_dtt_log) + ' | ' + 'INFO ' + ' | ' + '?' + ' | [' + convert(varchar, 0) + '] -> ' + ISNULL(@g_tx_err_msg, '?')
                PRINT  @g_tx_tmp_log_msg
            END

            IF ( (@g_is_persist_msg = 1) )
            BEGIN
                EXEC @g_id_return_status = ACT_msg_log   @tx_action_name = 'NEW', @id_env_key = @g_id_env_key, @id_user_mod_key = @id_user_mod_key, @dtt_mod = @g_dtt_log
                                                       , @id_state_key = @id_state_key, @id_action_key = @id_action_key, @tx_log_msg_type='?', @tx_log_level='INFO ', @id_log_level=2
                                                       , @tx_sp_name=@g_tx_sp_name, @id_line_num=@g_id_line_num, @id_err_code=0, @tx_log_msg=@g_tx_err_msg, @tx_json_log_msg = @tx_json_log_msg OUTPUT
            
                IF (@g_id_return_status != 0)
                BEGIN
                    RAISERROR ('Error calling ACT_msg_log', 16, 1)
                    IF (@g_is_sp_txn = 1)
                    BEGIN
                        SELECT @g_is_sp_txn = 0
                        ROLLBACK TRANSACTION
                
                        IF ( (@@NESTLEVEL = 1) )
                        BEGIN
                            EXEC @g_id_return_status = ACT_msg_log @tx_action_name = 'LOG_JSON', @tx_json_log_msg = @tx_json_log_msg, @ct_nestlevel = @@NESTLEVEL
                    
                            IF (@g_id_return_status != 0)
                            BEGIN
                                PRINT 'ERROR SAVING JSON LOG MSG!'
                            END
                        END
                    END
                    IF ( (@@NESTLEVEL = 1) AND (@g_is_ext_txn = 1) )
                    BEGIN
                        -- SELECT @tx_json_log_msg = 'JSON_LOG:[' + @tx_json_log_msg + ']'
                
                        IF (30008 = 0)
                        BEGIN
                            --RAISERROR (@tx_json_log_msg, 10, 1)
                            EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 10
                
                        END
                        ELSE
                        BEGIN
                            --RAISERROR (@tx_json_log_msg, 16, 1)
                            EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 16
                        END
                    END
                
                    RETURN 30008
                END
            END
        END
    END

    IF (((@id_env_key IS NULL) OR (@id_env_key = -2147483648)) AND @tx_action_name != 'LOGIN')
    BEGIN
        EXEC @g_id_return_status = GET_environment @id_env_key = @id_env_key OUTPUT, @tx_env_name   = @g_tx_env_name OUTPUT, @id_user_key = @id_user_mod_key

        SELECT @g_tx_err_msg = 'Error calling SP -> [GET_ENVIRONMENT] '
        IF (@g_id_return_status != 0)
        BEGIN
            RAISERROR (@g_tx_err_msg, 16, 1)
            IF (@g_is_sp_txn = 1)
            BEGIN
                SELECT @g_is_sp_txn = 0
                ROLLBACK TRANSACTION
        
                IF ( (@@NESTLEVEL = 1) )
                BEGIN
                    EXEC @g_id_return_status = ACT_msg_log @tx_action_name = 'LOG_JSON', @tx_json_log_msg = @tx_json_log_msg, @ct_nestlevel = @@NESTLEVEL
            
                    IF (@g_id_return_status != 0)
                    BEGIN
                        PRINT 'ERROR SAVING JSON LOG MSG!'
                    END
                END
            END
            IF ( (@@NESTLEVEL = 1) AND (@g_is_ext_txn = 1) )
            BEGIN
                -- SELECT @tx_json_log_msg = 'JSON_LOG:[' + @tx_json_log_msg + ']'
        
                IF (30001 = 0)
                BEGIN
                    --RAISERROR (@tx_json_log_msg, 10, 1)
                    EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 10
        
                END
                ELSE
                BEGIN
                    --RAISERROR (@tx_json_log_msg, 16, 1)
                    EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 16
                END
            END
        
            RETURN 30001
        END
    END

    SELECT @g_id_env_key = @id_env_key

    IF (((@dtt_mod IS NULL) OR (@dtt_mod = '01/01/1970')))
    BEGIN
        SELECT @dtt_mod = GETDATE()
    END

    IF (@tx_action_name != 'LOGIN')
    BEGIN
        IF (((@id_user_mod_key IS NULL) OR (@id_user_mod_key = -2147483648)))
        BEGIN
            RAISERROR ('Error:Int [@id_user_mod_key] should not be NULL', 16, 1)
            IF (@g_is_sp_txn = 1)
            BEGIN
                SELECT @g_is_sp_txn = 0
                ROLLBACK TRANSACTION
        
                IF ( (@@NESTLEVEL = 1) )
                BEGIN
                    EXEC @g_id_return_status = ACT_msg_log @tx_action_name = 'LOG_JSON', @tx_json_log_msg = @tx_json_log_msg, @ct_nestlevel = @@NESTLEVEL
            
                    IF (@g_id_return_status != 0)
                    BEGIN
                        PRINT 'ERROR SAVING JSON LOG MSG!'
                    END
                END
            END
            IF ( (@@NESTLEVEL = 1) AND (@g_is_ext_txn = 1) )
            BEGIN
                -- SELECT @tx_json_log_msg = 'JSON_LOG:[' + @tx_json_log_msg + ']'
        
                IF (30011 = 0)
                BEGIN
                    --RAISERROR (@tx_json_log_msg, 10, 1)
                    EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 10
        
                END
                ELSE
                BEGIN
                    --RAISERROR (@tx_json_log_msg, 16, 1)
                    EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 16
                END
            END
        
            RETURN 30011
        END
    END

    -- X_SET_NULL_ACTION

    SELECT  @g_tx_action_name_orig = @tx_action_name


    IF (@tx_action_name IN ('NEW', 'UPDATE','USER_CREATE','PRE_APPROVE'))
    BEGIN   
        --X_CHECK_STATE_TRANSITION('CREDIT_CARD', @tx_action_name, @id_action_key, @tx_state_name, @id_state_key)

    EXEC @g_id_return_status = GET_fsm_next_state 
                                  @tx_fsm_type_name     = 'CREDIT_CARD'
                                , @tx_action_name       = @tx_action_name
                                , @id_action_key        = @id_action_key            OUTPUT
                                , @id_state_key         = @id_state_key             OUTPUT
                                , @tx_state_name        = @g_tx_state_name_orig     OUTPUT      -- SP OUTPUT
                                , @id_state_key_next    = @id_state_key             OUTPUT
                                , @tx_state_name_next   = @tx_state_name            OUTPUT      -- SP OUTPUT
                                , @tx_err_msg           = @g_tx_err_msg             OUTPUT
                                    
    SELECT @g_tx_err_msg = 'Error calling SP -> [GET_fsm_next_state] ' + @g_tx_err_msg
    IF (@g_id_return_status != 0)
    BEGIN
        RAISERROR (@g_tx_err_msg, 16, 1)
        IF (@g_is_sp_txn = 1)
        BEGIN
            SELECT @g_is_sp_txn = 0
            ROLLBACK TRANSACTION
    
            IF ( (@@NESTLEVEL = 1) )
            BEGIN
                EXEC @g_id_return_status = ACT_msg_log @tx_action_name = 'LOG_JSON', @tx_json_log_msg = @tx_json_log_msg, @ct_nestlevel = @@NESTLEVEL
        
                IF (@g_id_return_status != 0)
                BEGIN
                    PRINT 'ERROR SAVING JSON LOG MSG!'
                END
            END
        END
        IF ( (@@NESTLEVEL = 1) AND (@g_is_ext_txn = 1) )
        BEGIN
            -- SELECT @tx_json_log_msg = 'JSON_LOG:[' + @tx_json_log_msg + ']'
    
            IF (30001 = 0)
            BEGIN
                --RAISERROR (@tx_json_log_msg, 10, 1)
                EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 10
    
            END
            ELSE
            BEGIN
                --RAISERROR (@tx_json_log_msg, 16, 1)
                EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 16
            END
        END
    
        RETURN 30001
    END

    SELECT @tx_state_name = @tx_state_name
    END

    IF ( @tx_action_name IN ('DELETE_FULL_CREDIT_CARD'))
    BEGIN
        UPDATE T_CREDIT_CARD
        SET id_credit_card_ver  = id_credit_card_ver + 1
        , is_active = 0
        WHERE id_credit_card_key = @id_credit_card_key
         
        UPDATE  T_EXISTING_LIABILITY
        SET is_active = 0
        WHERE id_credit_card_key = @id_credit_card_key

        UPDATE  T_DOCUMENT 
        SET is_active = 0
        WHERE id_ref_key = @id_credit_card_key
        AND tx_object_type = 'CREDIT_CARD'
    END

    IF ( @tx_action_name = 'SELECT_CREDIT_CARD_FOR_GRID' or  @tx_action_name  = 'SEARCH_DATA_FOR_CC_GRID')
    BEGIN

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
       
    END
    
    IF ( @tx_action_name = 'SELECT_FULL_CREDIT_CARD' )
    BEGIN   
        SELECT L.*
        INTO #TMP_CREDIT_CARD
        FROM T_CREDIT_CARD L
        WHERE id_credit_card_key = @id_credit_card_key
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
        WHERE id_credit_card_key = @id_credit_card_key
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

    END 
    
    IF ( @tx_action_name in( 'STATE_TRANSITION'))
    BEGIN
        set @tx_action_name = @tx_ui_action_name
        --X_CHECK_STATE_TRANSITION('CREDIT_CARD', @tx_action_name, @id_action_key, @tx_state_name, @id_state_key)

    EXEC @g_id_return_status = GET_fsm_next_state 
                                  @tx_fsm_type_name     = 'CREDIT_CARD'
                                , @tx_action_name       = @tx_action_name
                                , @id_action_key        = @id_action_key            OUTPUT
                                , @id_state_key         = @id_state_key             OUTPUT
                                , @tx_state_name        = @g_tx_state_name_orig     OUTPUT      -- SP OUTPUT
                                , @id_state_key_next    = @id_state_key             OUTPUT
                                , @tx_state_name_next   = @tx_state_name            OUTPUT      -- SP OUTPUT
                                , @tx_err_msg           = @g_tx_err_msg             OUTPUT
                                    
    SELECT @g_tx_err_msg = 'Error calling SP -> [GET_fsm_next_state] ' + @g_tx_err_msg
    IF (@g_id_return_status != 0)
    BEGIN
        RAISERROR (@g_tx_err_msg, 16, 1)
        IF (@g_is_sp_txn = 1)
        BEGIN
            SELECT @g_is_sp_txn = 0
            ROLLBACK TRANSACTION
    
            IF ( (@@NESTLEVEL = 1) )
            BEGIN
                EXEC @g_id_return_status = ACT_msg_log @tx_action_name = 'LOG_JSON', @tx_json_log_msg = @tx_json_log_msg, @ct_nestlevel = @@NESTLEVEL
        
                IF (@g_id_return_status != 0)
                BEGIN
                    PRINT 'ERROR SAVING JSON LOG MSG!'
                END
            END
        END
        IF ( (@@NESTLEVEL = 1) AND (@g_is_ext_txn = 1) )
        BEGIN
            -- SELECT @tx_json_log_msg = 'JSON_LOG:[' + @tx_json_log_msg + ']'
    
            IF (30001 = 0)
            BEGIN
                --RAISERROR (@tx_json_log_msg, 10, 1)
                EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 10
    
            END
            ELSE
            BEGIN
                --RAISERROR (@tx_json_log_msg, 16, 1)
                EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 16
            END
        END
    
        RETURN 30001
    END

    SELECT @tx_state_name = @tx_state_name

        IF(@tx_ui_action_name = 'RECEIVED' OR @tx_ui_action_name = 'PRE_APPROVE')
        BEGIN
            DECLARE @l_tx_app_id VARCHAR(16) 
            
            SELECT @l_tx_app_id = tx_application_number 
            FROM T_CREDIT_CARD
            WHERE id_credit_card_key = @id_credit_card_key 

            IF(@l_tx_app_id is NULl or @l_tx_app_id IN ('?', '') )
            BEGIN
                declare @l_Card_prefix varchar(4)
                -- get laon prefix from configuration      
                select @l_Card_prefix = tx_value3 from T_CONFIGURATION where id_configuration_key = @id_card_type_key
                set @tx_application_number = @l_Card_prefix + @tx_application_number
                
            END
        END
        IF(@tx_ui_action_name = 'PRE_APPROVE')
        BEGIN
            SET @dec_approved_limit = (SELECT dec_applied_amount FROM T_CREDIT_CARD WHERE id_credit_card_key =@id_credit_card_key)
        END

        IF(@dec_approved_limit is NULl)
        BEGIN
           SET @dec_approved_limit = -2147483648.00
        END

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
    END

    IF((@tx_card_delivery_from IS NOT NULL))
    BEGIN
        DECLARE @sq  char(1) = ''''
        SELECT @tx_card_delivery_from = substring(@tx_card_delivery_from, 1, charindex(@sq + @sq, @tx_card_delivery_from)) +
                trim(@sq FROM substring(@tx_card_delivery_from, charindex(@sq + @sq, @tx_card_delivery_from) + 1, len(@tx_card_delivery_from)))
    END

    IF ( @tx_action_name IN( 'NEW', 'FO_CREATE', 'SAVE','USER_CREATE') )
    BEGIN   
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

        INSERT INTO T_CREDIT_CARD
        (     
             id_credit_card_ver                   
            , -- id_credit_card_ver
     is_active
    , id_env_key
    , id_user_mod_key
    , dtt_mod
    , id_event_key
    , id_state_key
    , id_action_key
            
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
            , --  ISNULL(@id_credit_card_ver            , 0)
      ISNULL(@is_active         , 1)
    , ISNULL(@id_env_key        , 0)
    , ISNULL(@id_user_mod_key   , 0)
    , ISNULL(@dtt_mod           , GETDATE())
    , ISNULL(@id_event_key      , 0)
    , ISNULL(@id_state_key      , 0)
    , ISNULL(@id_action_key     , 0)

            , ISNULL(@id_legal_entity_key,-2147483648)
            , ISNULL(@id_customer_key,-2147483648)
            , ISNULL(@id_creator_key,-2147483648)
            , ISNULL(@dtt_create,GETDATE())
            , ISNULL(@id_card_type_key,-2147483648)
            , ISNULL(@id_customer_type_key,-2147483648)
            , ISNULL(@tx_data_source,'?')
            , ISNULL(@tx_account_no,'?')
            , ISNULL(@tx_sourcing_branch,'?')
            , ISNULL(@tx_sourcing_staff_id,'?')
            , ISNULL(@tx_source_branch,'?')
            , ISNULL(@tx_source_cse,'?')
            , ISNULL(@tx_source_self_application,'?')
            , ISNULL(@tx_source_others,'?')
            , ISNULL(@int_cc_tracking_number ,-2147483648)
            , ISNULL(@tx_application_number  ,'?')
            , ISNULL(@tx_source_from,'?')
            , ISNULL(@tx_card_monthly_bil_debited_from,'?')
            , ISNULL(@dec_salary_deposited_last_month,-2147483648)
            , ISNULL(@dec_additional_income_amount,-2147483648)
            , ISNULL(@dec_after_cbbl_emi,-2147483648)
            , ISNULL(@dec_total_income,-2147483648)
            , ISNULL(@dec_total_emi_paid_in_cbbl,-2147483648)
            , ISNULL(@tx_auto_debit_req_minimum_amount,'?')
            , ISNULL(@dec_remaining_emi,-2147483648)
            , ISNULL(@tx_additional_income_source,'?')
            , ISNULL(@tx_value_of_security,'?')
            , ISNULL(@tx_loan_to_value,'?')
            , ISNULL(@tx_gpf_loan,'?')
            , ISNULL(@dec_pre_approved_limit,-2147483648)
            , ISNULL(@dec_pre_approved_limit_lower,-2147483648)
            , ISNULL(@dec_pre_approved_limited_upper,-2147483648)
            , ISNULL(@dec_pre_approved_limit_range,-2147483648)
            , ISNULL(@dec_applied_card_min_bill,-2147483648)
            , ISNULL(@dec_applied_amount,-2147483648)
            , ISNULL(@tx_individual_declaration,'?')
            , ISNULL(@tx_card_delivery_from,'?')
            , ISNULL(@tx_declaration,'?')
            , ISNULL(@dec_auto_debit_req_min_amount,-2147483648)
            , ISNULL(@tx_auto_debit_req_full_outstanding,'?')
            , ISNULL(@tx_card_duplication_result,'?')
            , ISNULL(@tx_card_duplication_reason,'?')
            , ISNULL(@tx_un_sanction_result,'?')
            , ISNULL(@tx_un_sanction_reason,'?')
            , ISNULL(@tx_ofac_sanction_result,'?')
            , ISNULL(@tx_ofac_sanction_reason,'?')
            , ISNULL(@dec_applicant_asking_limit,-2147483648)
            , ISNULL(@dec_max_allowd_limit,-2147483648)
            , ISNULL(@dec_approved_limit,-2147483648)
            , ISNULL(@dec_balance_transfer_request_amount,-2147483648)
            , ISNULL(@dec_card_proposed_limit,-2147483648)
            , ISNULL(@tx_proposed_billing_date,'?')
            , ISNULL(@dec_minimum_payment,-2147483648)
            , ISNULL(@tx_bt_credit_card_outstanding,'?')
            , ISNULL(@tx_kyc_level,'?')
            , ISNULL(@tx_auto_debit_amount,'?')
            , ISNULL(@dec_interest_rate,-2147483648)
            , ISNULL(@dt_cib_generation,'01/01/1970')
            , ISNULL(@tx_cib_status,'?')
            , ISNULL(@dec_proposed_dbr,-2147483648)
            , ISNULL(@dec_net_monthly_income,-2147483648)
            , ISNULL(@tx_current_type_based_on_card_nature,'?')
            , ISNULL(@tx_card_security_type,'?')
            , ISNULL(@dec_allowed_muiltiplier,-2147483648)
            , ISNULL(@dec_amout_deposite_cbbl,-2147483648)
            , ISNULL(@dec_remaining_amount_after_paid_emi,-2147483648)
            , ISNULL(@dec_disposable_income,-2147483648)
            , ISNULL(@dec_existing_loan_emi,-2147483648)
            , ISNULL(@dec_total_emi,-2147483648)
            , ISNULL(@tx_duplications,'?')
            , ISNULL(@tx_maximum_allowed_multiplier,'?')
            , ISNULL(@dec_maximum_allowed_dbr,-2147483648)
            , ISNULL(@dec_recommend_for_approval,-2147483648)
            , ISNULL(@tx_concer_bank_name,'?')
            , ISNULL(@tx_bt_request,'?')
            , ISNULL(@int_in_group ,-2147483648)
            , ISNULL(@tx_card_group_id,'?')
            , ISNULL(@id_card_group_creator_key,-2147483648)
            , ISNULL(@dtt_group_create,'01/01/1970')
            , ISNULL(@tx_duplication_areas,'?')
            , ISNULL(@tx_name_of_card,'?')
            , ISNULL(@tx_reference_name ,'?')
            , ISNULL(@tx_relationship_with_applicant    ,'?')
            , ISNULL(@tx_reference_profesion ,'?')
            , ISNULL(@tx_reference_name_of_organization ,'?')
            , ISNULL(@tx_reference_designation  ,'?')
            , ISNULL(@tx_reference_work_and_residence_address   ,'?')
            , ISNULL(@tx_reference_telephone    ,'?')
            , ISNULL(@tx_reference_mobile   ,'?')
            , ISNULL(@tx_reference_email    ,'?')
            , ISNULL(@tx_cib_report_status_list    ,'?')
        )
        
        SELECT @id_credit_card_key = IDENT_CURRENT('T_CREDIT_CARD')

        UPDATE T_CREDIT_CARD
        SET id_credit_card_ver = id_credit_card_ver + 1
        , int_cc_tracking_number = @id_credit_card_key
        where id_credit_card_key = @id_credit_card_key
    END

    IF ( @tx_action_name = 'SELECT' )
    BEGIN
        SELECT  tx_rs_type = 'RS_TYPE_CREDIT_CARD'
        , L.*
        , S.tx_state_name
        , s.id_fsm_state_key as id_state_key
        , S.tx_display_text as tx_state_display_label
        FROM  T_CREDIT_CARD L
        JOIN T_FSM_STATE   S ON L.id_state_key = S.id_fsm_state_key
        WHERE  id_credit_card_key = ISNULL(@id_credit_card_key        ,id_credit_card_key)
        AND    tx_application_number  = ISNULL(@tx_application_number  ,tx_application_number)
        AND    L.is_active = 1
    END

    IF (@tx_action_name IN( 'DELETE'))
    BEGIN 
        SELECT  @tx_action_name = 'UPDATE'
        , @is_active = 0
    END

    IF( @tx_action_name IN( 'UPDATE', 'FO_UPDATE','PRE_APPROVE') )
    BEGIN

        IF(@tx_action_name = 'PRE_APPROVE')
        BEGIN
            DECLARE @l_tx_app_id1 VARCHAR(16)
            
            SELECT @l_tx_app_id1 = tx_application_number 
            FROM T_CREDIT_CARD
            WHERE id_credit_card_key = @id_credit_card_key

            SELECT @id_card_type_key = id_card_type_key 
            FROM T_CREDIT_CARD
            WHERE id_credit_card_key = @id_credit_card_key

            IF(@l_tx_app_id1 is NULl or @l_tx_app_id1 IN ('?', '') )
            BEGIN
                declare @l_Card_prefix1 varchar(4)
                -- get card prefix from configuration      
                select @l_Card_prefix1 = tx_value3 from T_CONFIGURATION where id_configuration_key = @id_card_type_key
                set @tx_application_number = @l_Card_prefix1 + @tx_application_number               
            END
        END

        UPDATE T_CREDIT_CARD
        SET 
        --  id_credit_card_ver              = @id_credit_card_ver + 1
      is_active             = ISNULL(@is_active         , is_active)
    , id_env_key            = ISNULL(@id_env_key        , id_env_key)
    , id_user_mod_key       = ISNULL(@id_user_mod_key   , id_user_mod_key)  
    , dtt_mod               = ISNULL(@dtt_mod           , dtt_mod)
    , id_event_key          = ISNULL(@id_event_key      , id_event_key)
    , id_state_key          = ISNULL(@id_state_key      , id_state_key)
    , id_action_key         = ISNULL(@id_action_key     , id_action_key)
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
    END
    IF ( @tx_action_name = 'SELECT_CARD_WORK_HISTORY')
    BEGIN
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
    END
    
    IF ( @tx_action_name = 'SELECT_RECOMMEND_TO_ROLE' )
    BEGIN

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

    END
    IF ( @tx_action_name = 'SELECT_RETURN_TO_ROLE' )
    BEGIN

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
    END
    IF ( (@tx_action_name = 'CREATE_CARD_GROUP') OR (@tx_action_name = 'ADD_CARD_TO_CARD_GROUP'))
    BEGIN
     
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
      
    END

    IF(@tx_action_name = 'SELECT_ALL_CARD_GROUP_DATA' OR @tx_action_name = 'SEARCH_CARD_GROUP_DATA')
    BEGIN

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
    END

    IF(@tx_action_name = 'SELECT_FOR_ADD_TO_CARD_GROUP')
    BEGIN
        
        if(@tx_value2 = 'CARD_OFFICER')
        BEGIN
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
        END
        else
        BEGIN
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
        END
    END

    IF ( @tx_action_name = 'REMOVE_CARD_FROM_CARD_GROUP' )
    BEGIN

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
    END
    IF(@tx_action_name = 'SELECT_ECARD_GRID_DATA')
    BEGIN
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
    END
    IF ( @tx_action_name = 'LOAD_DATA_SOURCE' )
    BEGIN
        SELECT DISTINCT tx_rs_type = 'RS_TYPE_DATA_SOURCE',  tx_data_source FROM T_CREDIT_CARD
    END
    IF(@tx_action_name = 'SELECT_CARD_FROM_GROUP')
    BEGIN
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
    END
    IF(@tx_action_name = 'LOAN_GROUP_COMMENTS_VIEW')
    BEGIN
        SELECT DISTINCT tx_rs_type = 'RS_TYPE_LOAN_GROUP_COMMENT'        
         , LG.tx_cad_comment
         , LG.tx_ho_crm_comment
         , LG.tx_loan_group_id
         , ST.tx_state_name
         , ST.tx_display_text
        FROM T_LOAN_GROUP LG 
        JOIN T_FSM_STATE ST ON ST.id_fsm_state_key = LG.id_state_key
        where LG.tx_card_group_id = @tx_card_group_id;
    END
    IF(@tx_action_name = 'SELECT_PRE_APPROVAL_LIMIT')
    BEGIN
        SELECT DISTINCT tx_rs_type = 'RS_TYPE_APPROVAL_LIMIT'        
         , C.*
        FROM T_CONFIGURATION C 
        where C.tx_value2 = @tx_value2;
    END
    IF(@tx_action_name = 'SELECT_CREDIT_CARD_DETAILS')
    BEGIN
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
    END

    IF(@tx_action_name = 'SELECT_FOR_DUPLICATE_CHECK')
    BEGIN 
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
        BEGIN
          SELECT  @tx_action_name = 'SELECT_CUTOMER_ALL_LOAN'
          --or
          --SELECT  @tx_action_name = 'SELECT_CUTOMER_ALL_LOAN';
        END
    END
    IF(@tx_action_name = 'SELECT_CUTOMER_ALL_LOAN')
    BEGIN
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
    END
    IF ( @tx_action_name = 'CIB_STATUS_UPDATE') 
    BEGIN
        SELECT @dt_cib_generation = GETDATE()
        UPDATE      T_CREDIT_CARD
        SET id_credit_card_ver  = id_credit_card_ver + 1 
        , dt_cib_generation = @dt_cib_generation
        , dtt_mod = @dt_cib_generation
        , tx_cib_report_status_list              = ISNULL(@tx_cib_report_status_list              ,tx_cib_report_status_list)
       

        WHERE       id_credit_card_key = @id_credit_card_key
    END
    IF ( @tx_action_name = 'SELECT_ACQUISITION_DATA') 
    BEGIN
         SELECT tx_rs_type = 'RS_TYPE_ACQUISITION_DATA'
        , AAD.* 
        , tx_card_state_name as tx_folder_name
        FROM T_ACQUISITION_APPLICANT_DETAILS AAD
        WHERE AAD.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,AAD.dtt_create)
        AND CAST(AAD.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,AAD.dtt_create)
        AND AAD.id_credit_card_key       = ISNULL(@id_credit_card_key        ,AAD.id_credit_card_key)
        AND AAD.is_active     = 1
        ORDER BY dtt_mod DESC
    END    
    IF ( (@g_is_record_time = 1) )
        SELECT @g_dtt_proc_end = GETDATE()
    IF ( (@g_is_record_time = 1) )
        SELECT @g_dtt_tot_elapsed  = datediff(ss, @g_dtt_proc_start, @g_dtt_proc_end)

    SELECT @g_tx_err_msg = 'Exiting[ACT_credit_card] : @tx_action[' + ISNULL(@tx_action_name, '?') + ']'
    SELECT @g_dtt_log = GETDATE(), @g_tx_sp_name = 'ACT_credit_card.sp', @g_id_line_num = 1628

    -- TODO_H : [Naz] Move to Function

    IF ( NOT (((@g_id_log_level IS NULL) OR (@g_id_log_level = -2147483648))) )
    BEGIN
        IF (2 >= @g_id_log_level)
        BEGIN
            IF (@g_is_print_msg = 1)
            BEGIN
                SELECT @g_tx_tmp_log_msg = '[' + @g_tx_sp_name + ':' + convert(varchar, @g_id_line_num) + '] | ' + convert(varchar, @g_dtt_log) + ' | ' + 'INFO ' + ' | ' + '?' + ' | [' + convert(varchar, 0) + '] -> ' + ISNULL(@g_tx_err_msg, '?')
                PRINT  @g_tx_tmp_log_msg
            END

            IF ( (@g_is_persist_msg = 1) )
            BEGIN
                EXEC @g_id_return_status = ACT_msg_log   @tx_action_name = 'NEW', @id_env_key = @g_id_env_key, @id_user_mod_key = @id_user_mod_key, @dtt_mod = @g_dtt_log
                                                       , @id_state_key = @id_state_key, @id_action_key = @id_action_key, @tx_log_msg_type='?', @tx_log_level='INFO ', @id_log_level=2
                                                       , @tx_sp_name=@g_tx_sp_name, @id_line_num=@g_id_line_num, @id_err_code=0, @tx_log_msg=@g_tx_err_msg, @tx_json_log_msg = @tx_json_log_msg OUTPUT
            
                IF (@g_id_return_status != 0)
                BEGIN
                    RAISERROR ('Error calling ACT_msg_log', 16, 1)
                    IF (@g_is_sp_txn = 1)
                    BEGIN
                        SELECT @g_is_sp_txn = 0
                        ROLLBACK TRANSACTION
                
                        IF ( (@@NESTLEVEL = 1) )
                        BEGIN
                            EXEC @g_id_return_status = ACT_msg_log @tx_action_name = 'LOG_JSON', @tx_json_log_msg = @tx_json_log_msg, @ct_nestlevel = @@NESTLEVEL
                    
                            IF (@g_id_return_status != 0)
                            BEGIN
                                PRINT 'ERROR SAVING JSON LOG MSG!'
                            END
                        END
                    END
                    IF ( (@@NESTLEVEL = 1) AND (@g_is_ext_txn = 1) )
                    BEGIN
                        -- SELECT @tx_json_log_msg = 'JSON_LOG:[' + @tx_json_log_msg + ']'
                
                        IF (30008 = 0)
                        BEGIN
                            --RAISERROR (@tx_json_log_msg, 10, 1)
                            EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 10
                
                        END
                        ELSE
                        BEGIN
                            --RAISERROR (@tx_json_log_msg, 16, 1)
                            EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 16
                        END
                    END
                
                    RETURN 30008
                END
            END
        END
    END

    IF ( (@@NESTLEVEL = 1) AND (@g_is_ext_txn = 1) )
    BEGIN
        -- SELECT @tx_json_log_msg = 'JSON_LOG:[' + @tx_json_log_msg + ']'

        IF (0 = 0)
        BEGIN
            --RAISERROR (@tx_json_log_msg, 10, 1)
            EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 10

        END
        ELSE
        BEGIN
            --RAISERROR (@tx_json_log_msg, 16, 1)
            EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 16
        END
    END

    RETURN 0
END
go

GRANT EXECUTE ON ACT_credit_card TO app_ro, app_rw
    go