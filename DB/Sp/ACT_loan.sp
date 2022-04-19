/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 24 DEC 2019
* Description   : 
*****************************************************************************************/
    

EXEC DROP_db_object @tx_db_object_type = 'P', @tx_db_object_name = 'ACT_Loan'
    go

IF ('CREATE' = 'CREATE')
        PRINT '**** WARNING : CREATING SP ****'
    ELSE IF ('CREATE' = 'ALTER')
        PRINT '**** WARNING : ALTER SP ****'
    ELSE
        PRINT '**** WARNING : UNKNOWN TABLE PROC ****'
    go

    CREATE PROC ACT_Loan
    
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

    , @id_loan_key                     INT                    = NULL       OUTPUT
    , @id_loan_ver                         INT                    = NULL   

    , @id_creator_key                   INT                   = NULL
    , @dtt_create                       DATETIME              = NULL
    , @id_customer_key                  INT                   = NULL       OUTPUT

    , @tx_application_no                VARCHAR(256)           = NULL    
    , @id_loan_type_key                 INT                    = NULL
    , @id_customer_type_key             INT                    = NULL

    , @dec_applied_loan_amount          DECIMAL(20,2)          = NULL
    , @tx_loan_purpose                  VARCHAR(256)           = NULL
    , @int_over_loan                    INT                    = NULL
    , @dec_net_monthly_income           DECIMAL(20,2)          = NULL
    , @dec_tenor_year                   DECIMAL(20,2)          = NULL
    , @dec_existing_loan_amount         DECIMAL(20,2)          = NULL
    , @dec_interest_rate                DECIMAL(20,2)          = NULL
    , @dec_total_emi                    DECIMAL(20,2)          = NULL
    , @dec_monthly_installment          DECIMAL(20,2)          = NULL
    , @dec_disposable_income            DECIMAL(20,2)          = NULL
    , @tx_propose_emi_date              VARCHAR(256)           = NULL
    , @tx_duplications                  VARCHAR(256)           = NULL
    , @dtt_cib_generation_date          DATETIME               = NULL
    , @dec_proposed_dbr                 DECIMAL(20,2)          = NULL
    , @dec_allowed_dbr                  DECIMAL(20,2)          = NULL
    , @tx_cib_status                    VARCHAR(256)           = NULL
    , @dec_price_quotation_amount       DECIMAL(20,2)          = NULL
    , @tx_bank_participation            VARCHAR(256)           = NULL
    , @dec_business_recommended_amnt    DECIMAL(20,2)          = NULL
    , @dec_recommended_for_approval     DECIMAL(20,2)          = NULL

    , @tx_security                      VARCHAR(256)           = NULL
    , @tx_dob_of_pg_year                VARCHAR(256)           = NULL
    , @tx_guarantor_elibiblity          VARCHAR(256)           = NULL
    , @dtt_dob_of_pg                    DATETIME               = NULL
    , @dec_remaining_amt_aft_eml        DECIMAL(20,2)          = NULL
    , @dec_gross_salary_per_month       DECIMAL(20,2)          = NULL
    , @tx_borrower_participation        VARCHAR(256)           = NULL
    , @id_legal_entity_key              INT                    = NULL
    , @id_customer_ver                  INT                    = NULL
    , @id_role_key                     INT                     = NULL
    , @tx_name_of_guarantor             VARCHAR(256)           = NULL
    , @tx_relationship_with_applicant   VARCHAR(256)           = NULL
    , @tx_relationship_with_pg          VARCHAR(256)           = NULL
    , @tx_data_source                   VARCHAR(256)           = NULL
    , @tx_loan_tracking_id              VARCHAR(32)            = NULL
    , @int_sl_generate_cnt               INT                   = NULL

    , @tx_account_no                    VARCHAR(256)           = NULL
    , @tx_bp_no                         VARCHAR(256)           = NULL
    , @tx_nid                           VARCHAR(256)           = NULL
    , @tx_phone                         VARCHAR(256)           = NULL
    , @tx_from_date                     VARCHAR(256)           = NULL
    , @tx_to_date                       VARCHAR(256)           = NULL
    , @tx_ui_action_name                VARCHAR(256)           = NULL
    , @tx_verification_email            VARCHAR(64)            = NULL
    , @int_recommend_group_key          INT                    = NULL
    , @int_recommend_to_key             INT                    = NULL
    , @int_approved_by_key              INT                    = NULL
    , @tx_loan_group_id                 VARCHAR(16)            = NULL

    , @tx_role_ids                      VARCHAR(256)           = NULL
    , @tx_condition                     VARCHAR(256)           = NULL
    , @tx_loan_ids                      VARCHAR(512)           = NULL
    , @tx_staff_id                      VARCHAR(96)            = NULL
    , @dec_gPF_amount                   DECIMAL(20, 2)         = NULL
    , @tx_guarantor_nid                 VARCHAR(256)           = NULL
    , @tx_sourcing_brc                  VARCHAR(256)           = NULL
    , @l_tmp_loan_state_key             VARCHAR(48)            = NULL
    , @l_tmp_loan_state_name            VARCHAR(48)            = NULL
    , @dtt_group_create                 DATETIME               = NULL
    , @int_in_group                     INT                    = NULL /*  0 for not create group,1 for create group,2 for remove from group */
    , @tx_mobile_guarantor              VARCHAR(256)           = NULL
    , @tx_customer_name                 VARCHAR(256)           = NULL
    , @int_top_up                        INT                    = NULL
    , @int_start_value                  INT                     = NULL
    , @int_limit_value                  INT                     = NULL
    , @tx_loan_id_list                 VARCHAR(max)           = NULL
    , @tx_el_search_sate                VARCHAR(256)           = NULL
    , @tx_group_id_dec                VARCHAR(256)           = NULL
    , @dec_guarantor_earnings           DECIMAL(20,2)          = NULL
    , @tx_cib_report_status_list       VARCHAR(256)           = NULL
    , @tx_tin                           VARCHAR(256)           = NULL

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
        EXEC @g_id_return_status = GET_sp_log_level @tx_sp_name='ACT_Loan', @tx_log_level=@tx_log_level OUTPUT, @id_log_level=@id_log_level OUTPUT, @is_record_time=@is_record_time OUTPUT, @is_print_msg=@is_print_msg OUTPUT, @is_persist_msg=@is_persist_msg OUTPUT
    END

    SELECT @g_is_record_time = @is_record_time, @g_is_print_msg = @is_print_msg, @g_is_persist_msg  = @is_persist_msg, @g_id_log_level = @id_log_level

    SELECT @g_tx_err_msg = 'Entering[ACT_Loan] : @tx_action[' + ISNULL(@tx_action_name, '?') + ']'
    SELECT @g_dtt_log = GETDATE(), @g_tx_sp_name = 'ACT_loan.sp', @g_id_line_num = 221

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


    IF (@tx_action_name IN ('NEW', 'UPDATE','DELETE', 'FO_CREATE', 'FO_UPDATE', 'SO_CREATE' , 'FO_DELETE', 'SO_UPDATE', 'FO_SUBMIT', 'SO_RECOMMEND', 'SO_RE_RECOMMEND', 'MIS_UPDATE' , 'MIS_ALLOCATE', 'MIS_RE_ALLOCATE', 'FO_DELETE', 'SO_DELETE','CA_DELETE', 'CA_UPDATE', 'CA_RECOMMEND', 'CA_RE_RECOMMEND', 'CAD_QUERY_TO_SO', 'CAD_QUERY_TO_CA', 'SO_CAD_QUERY_UPDATE','CA_CAD_QUERY_UPDATE','CAD_DISBURSE') )
    BEGIN   
        --X_CHECK_STATE_TRANSITION('LOAN', @tx_action_name, @id_action_key, @tx_state_name, @id_state_key)

    EXEC @g_id_return_status = GET_fsm_next_state 
                                  @tx_fsm_type_name     = 'LOAN'
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

    IF ( @tx_action_name IN ('DELETE_FULL_LOAN'))
    BEGIN
        UPDATE T_LOAN
        SET id_loan_ver  = id_loan_ver + 1
        , is_active = 0
        WHERE id_loan_key = @id_loan_key
         
        UPDATE  T_EXISTING_LIABILITY
        SET is_active = 0
        WHERE id_loan_key = @id_loan_key

        UPDATE  T_COMMENT 
        SET is_active = 0
        WHERE tx_object_type = 'LOAN'
        AND tx_comment_type IN 
        (
            'CIB_STATUS', 
            'ANALYSTS_COMMENTS', 
            'EXCEPTION_DETAILS', 
            'INSTRUCTION_TO_CAD', 
            'COMMENTS_JUSTIFICATION', 
            'BM_RECOMMENDATION',
            'SO_RECOMMENDATION',
            'COMMENTS_WAIVER_SOUGHT'
        )
        AND id_ref_key = @id_loan_key

        UPDATE  T_LOAN_DOCUMENT 
        SET is_active = 0
        WHERE id_loan_key = @id_loan_key
        AND tx_doc_type != 'CIB_STATUS'
    END

    IF ( @tx_action_name = 'SELECT_LOAN_FOR_GRID')
    BEGIN
        SELECT DISTINCT id_loan_key AS id_to_keep_distinct
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
        , int_permission
        INTO #TEMP_LOAN_FOR_GRID
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_ROLE_STATE_MAP M ON M.id_fsm_state_key = S.id_fsm_state_key and M.is_active = 1
        JOIN T_ROLE R ON R.id_role_key = M.id_role_key
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
         WHERE R.id_role_key IN 
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
        AND L.tx_account_no = ISNULL(@tx_account_no ,L.tx_account_no)
        AND C.tx_bp_no        = ISNULL(@tx_bp_no      ,C.tx_bp_no)
        AND C.tx_nid          = ISNULL(@tx_nid        ,C.tx_nid)
        AND C.tx_mobile       = ISNULL(@tx_phone        ,C.tx_mobile)
        AND L.tx_loan_tracking_id  = ISNULL(@tx_loan_tracking_id        ,L.tx_loan_tracking_id)
        AND L.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_create)
        AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_create)
        AND L.tx_application_no = ISNULL(@tx_application_no        ,L.tx_application_no)
        AND L.tx_data_source = ISNULL(@tx_data_source       ,L.tx_data_source)
        AND L.is_active     = 1
        ORDER BY L.dtt_mod DESC


        SELECT LG.*
        , LE.tx_legal_entity_name
        , USR.tx_login_name  AS tx_creator_name
        INTO #TEMP_LOAN_FOR_GRID_3
        FROM #TEMP_LOAN_FOR_GRID LG
        JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = LG.id_legal_entity_key
        JOIN T_USER USR ON USR.id_user_key = LG.id_creator_key

        /*
        INSERT INTO #TEMP_LOAN_FOR_GRID_3
        SELECT * FROM #TEMP_LOAN_FOR_GRID_2
        */
        -- If your is RM then user should see only his loan. and common loan.
        -- check user is RM or not
       
        DECLARE @l_id_filter_role_key int


        SELECT  @l_id_filter_role_key =  r.id_role_key
        FROM    V_GROUP_ROLE        R
        JOIN    V_USER_GROUP        GRP     ON GRP.id_group_key = R.id_group_key
        JOIN    T_USER              USR     ON USR.id_user_key  = GRP.id_user_key
        WHERE   USR.id_user_key     = ISNULL(@id_user_mod_key , USR.id_user_key)
        AND     USR.is_active       = 1
        AND     GRP.is_active       = 1
        AND     R.is_active     = 1
        AND     r.tx_role_name IN ( 'RISK_MANAGER', 'UNIT_HEAD')

        IF(@l_id_filter_role_key IS NOT NULL)
        BEGIN
           SELECT tx_rs_type = 'RS_TYPE_LOAN_FOR_GRID', * 
           , tx_state_display_label as tx_folder_name
           FROM #TEMP_LOAN_FOR_GRID_3
           where int_recommend_group_key = @l_id_filter_role_key 
           OR tx_state_name IN ('RM_APPROVED', 'UH_APPROVED', 'RM_DEFERED', 'RM_DECLINED','UH_DECLINED','HOCRM_DECLINED')
           ORDER BY dtt_mod DESC
           --int_recommend_to_key = @id_user_mod_key -- to see only user loan
           --or int_recommend_to_key < 1 -- to see group loan
        END
        ELSE  
        BEGIN
           SELECT tx_rs_type = 'RS_TYPE_LOAN_FOR_GRID', * 
           , tx_state_display_label as tx_folder_name
           FROM #TEMP_LOAN_FOR_GRID_3
           ORDER BY dtt_mod DESC
        END
    END

    IF ( @tx_action_name IN ('SELECT_UNIT_HEAD_LOAD_DATA'))
    BEGIN
        SELECT DISTINCT id_loan_key AS id_to_keep_distinct
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
        , M.int_permission
        INTO #TEMP_LOAN_FOR_UH_GRID
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_ROLE_STATE_MAP M ON M.id_fsm_state_key = S.id_fsm_state_key and M.is_active = 1
        JOIN T_ROLE R ON R.id_role_key = M.id_role_key
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        WHERE R.id_role_key IN 
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
        AND L.dtt_mod      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_mod)
        AND CAST(L.dtt_mod AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_mod)
        AND tx_state_name IN ('CA_RECOMMENDED','RM_RECOMMENDED')
        AND L.is_active     = 1
        ORDER BY L.dtt_mod DESC

       SELECT LG.*
        , LE.tx_legal_entity_name
        , USR.tx_login_name  AS tx_creator_name
        INTO #TEMP_LOAN_FOR_GRID_UH_L
        FROM #TEMP_LOAN_FOR_UH_GRID LG
        JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = LG.id_legal_entity_key
        JOIN T_USER USR ON USR.id_user_key = LG.id_creator_key

        BEGIN
        SELECT tx_rs_type = 'RS_TYPE_LOAN_FOR_GRID'
           , * 
           , tx_state_display_label as tx_folder_name
           FROM #TEMP_LOAN_FOR_GRID_UH_L
           ORDER BY dtt_mod DESC
        END
    END

    IF( @tx_action_name = 'SELECT_ALL_LOAN_LAST_ACTION_WISE')
    BEGIN
        SELECT DISTINCT id_loan_key AS id_to_keep_distinct
        , L.*
        ,C.tx_customer_id 
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
        , int_permission
        INTO #TEMP_LOAN_LAST_ACTION_FOR_GRID
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
      JOIN T_ROLE_STATE_MAP M ON M.id_fsm_state_key = S.id_fsm_state_key and M.is_active = 1
        JOIN T_ROLE R ON R.id_role_key = M.id_role_key
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        WHERE R.id_role_key IN 
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
        AND L.tx_account_no = ISNULL(@tx_account_no ,L.tx_account_no)
        AND C.tx_bp_no        = ISNULL(@tx_bp_no      ,C.tx_bp_no)
        AND C.tx_nid          = ISNULL(@tx_nid        ,C.tx_nid)
        AND C.tx_mobile       = ISNULL(@tx_phone        ,C.tx_mobile)
        AND L.tx_loan_tracking_id  = ISNULL(@tx_loan_tracking_id        ,L.tx_loan_tracking_id)
        AND L.dtt_mod      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_mod)
        AND CAST(L.dtt_mod AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_mod)
        AND L.tx_application_no = ISNULL(@tx_application_no        ,L.tx_application_no)
        AND L.tx_data_source = ISNULL(@tx_data_source       ,L.tx_data_source)
        AND L.is_active     = 1
        ORDER BY L.dtt_mod DESC

        SELECT LG.*
        , LE.tx_legal_entity_name
        , USR.tx_login_name  AS tx_creator_name
        INTO #TEMP_LOAN_FOR_GRID_4
        FROM #TEMP_LOAN_LAST_ACTION_FOR_GRID LG
        JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = LG.id_legal_entity_key
        JOIN T_USER USR ON USR.id_user_key = LG.id_creator_key

        /*
        INSERT INTO #TEMP_LOAN_FOR_GRID_3
        SELECT * FROM #TEMP_LOAN_FOR_GRID_2
        */
        -- If your is RM then user should see only his loan. and common loan.
        -- check user is RM or not

       DECLARE @l_a_id_filter_role_key int


        SELECT  @l_a_id_filter_role_key =  r.id_role_key
        FROM    V_GROUP_ROLE        R
        JOIN    V_USER_GROUP        GRP     ON GRP.id_group_key = R.id_group_key
        JOIN    T_USER              USR     ON USR.id_user_key  = GRP.id_user_key
        WHERE   USR.id_user_key     = ISNULL(@id_user_mod_key , USR.id_user_key)
        AND     USR.is_active       = 1
        AND     GRP.is_active       = 1
        AND     R.is_active     = 1
        AND     r.tx_role_name IN ( 'RISK_MANAGER', 'UNIT_HEAD')

        IF(@l_a_id_filter_role_key IS NOT NULL)
        BEGIN
           SELECT tx_rs_type = 'RS_TYPE_LOAN_FOR_GRID', * 
           , tx_state_display_label as tx_folder_name
           FROM #TEMP_LOAN_FOR_GRID_4
           where int_recommend_group_key = @l_a_id_filter_role_key 
           OR tx_state_name IN ('RM_APPROVED', 'UH_APPROVED', 'RM_DEFERED', 'RM_DECLINED','HOCRM_DECLINED')
           ORDER BY dtt_mod DESC
           --int_recommend_to_key = @id_user_mod_key -- to see only user loan
           --or int_recommend_to_key < 1 -- to see group loan
        END
        ELSE
        BEGIN
           SELECT tx_rs_type = 'RS_TYPE_LOAN_FOR_GRID', * 
           , tx_state_display_label as tx_folder_name
           FROM #TEMP_LOAN_FOR_GRID_4
           ORDER BY dtt_mod DESC
        END
    END
    IF ( @tx_action_name = 'SELECT_LOAN_WITH_OUT_GROUP')
    BEGIN
            SELECT DISTINCT id_loan_key AS id_to_keep_distinct
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
            , int_permission
            INTO #TEMP_LOAN_WITHOUT_GROUP
            FROM T_LOAN L
            JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
            JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
            JOIN T_ROLE_STATE_MAP M ON M.id_fsm_state_key = S.id_fsm_state_key and M.is_active = 1
            JOIN T_ROLE R ON R.id_role_key = M.id_role_key
            JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
             WHERE R.id_role_key IN 
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
            AND S.tx_state_name IN ('RM_APPROVED', 'UH_APPROVED','HOCRM_APPROVED')
            AND (L.tx_loan_group_id IS          NULL OR L.tx_loan_group_id = '?') 
            AND L.tx_account_no = ISNULL(@tx_account_no ,L.tx_account_no)
            AND C.tx_bp_no        = ISNULL(@tx_bp_no      ,C.tx_bp_no)
            AND C.tx_nid          = ISNULL(@tx_nid        ,C.tx_nid)
            AND C.tx_mobile       = ISNULL(@tx_phone        ,C.tx_mobile)
            AND L.tx_loan_tracking_id  = ISNULL(@tx_loan_tracking_id        ,L.tx_loan_tracking_id)
            AND L.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_create)
            AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_create)
            AND L.tx_application_no = ISNULL(@tx_application_no        ,L.tx_application_no)
            AND L.tx_data_source = ISNULL(@tx_data_source       ,L.tx_data_source)
            AND L.is_active     = 1
            ORDER BY L.dtt_mod DESC


            SELECT LG.*
            , LE.tx_legal_entity_name
            , USR.tx_login_name  AS tx_creator_name
            INTO #TEMP_LOAN_WITHOUT_GROUP_G
            FROM #TEMP_LOAN_WITHOUT_GROUP LG
            JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = LG.id_legal_entity_key
            JOIN T_USER USR ON USR.id_user_key = LG.id_creator_key
           
            DECLARE @l_id_filter_role_key_1 int


            SELECT  @l_id_filter_role_key =  r.id_role_key
            FROM    V_GROUP_ROLE        R
            JOIN    V_USER_GROUP        GRP     ON GRP.id_group_key = R.id_group_key
            JOIN    T_USER              USR     ON USR.id_user_key  = GRP.id_user_key
            WHERE   USR.id_user_key     = ISNULL(@id_user_mod_key , USR.id_user_key)
            AND     USR.is_active       = 1
            AND     GRP.is_active       = 1
            AND     R.is_active     = 1
            AND     r.tx_role_name IN ( 'RISK_MANAGER', 'UNIT_HEAD')

            IF(@l_id_filter_role_key_1 IS NOT NULL)
            BEGIN
               SELECT tx_rs_type = 'RS_TYPE_LOAN_FOR_GRID', * 
               , tx_state_display_label as tx_folder_name
               FROM #TEMP_LOAN_WITHOUT_GROUP_G
               where int_recommend_group_key = @l_id_filter_role_key 
               OR tx_state_name IN ('RM_APPROVED', 'UH_APPROVED', 'RM_DEFERED', 'RM_DECLINED','UH_DECLINED','HOCRM_DECLINED')
               ORDER BY dtt_mod DESC
               --int_recommend_to_key = @id_user_mod_key -- to see only user loan
               --or int_recommend_to_key < 1 -- to see group loan
            END
            ELSE  
            BEGIN
               SELECT tx_rs_type = 'RS_TYPE_LOAN_FOR_GRID', * 
               , tx_state_display_label as tx_folder_name
               FROM #TEMP_LOAN_WITHOUT_GROUP_G
               ORDER BY dtt_mod DESC
            END
    END

    IF ( @tx_action_name = 'SELECT_WORK_HISTORY')
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
        INTO #TEMP_LOAN_HISTORY
        FROM T_LOAN_AUDIT   L
        JOIN T_LOAN_AUDIT   L2 ON L2.id_loan_key        =   L.id_loan_key
                            AND L2.id_loan_ver          >=  L.id_loan_ver
        JOIN T_FSM_STATE    S ON L.id_state_key         = S.id_fsm_state_key
        JOIN T_FSM_TYPE     T ON S.id_fsm_type_key      = T.id_fsm_type_key 
                            AND T.tx_fsm_type_name      = 'LOAN'
        JOIN T_CUSTOMER     C ON C.id_customer_key      = L.id_customer_key 
        JOIN T_FSM_ACTION   A ON A.id_fsm_action_key    =  L.id_action_key
        JOIN T_USER         U ON U.id_user_key          = L.id_user_mod_key
        WHERE L.id_user_mod_key                         = @id_user_mod_key
        AND L.dtt_mod                                   >= CAST(@tx_from_date AS DATE)
        AND CAST(L.dtt_mod AS DATE)                     <= CAST(@tx_to_date AS DATE)
        ORDER BY L.dtt_mod

        SELECT tx_rs_type = 'RS_TYPE_WORK_HISTORY'
            , H.* 
            , S.tx_display_text     AS tx_current_state_name
            , u.tx_login_name       AS tx_creator_name
        FROM #TEMP_LOAN_HISTORY H
        JOIN T_LOAN             L ON L.id_loan_key      = H.id_loan_key
        JOIN T_FSM_STATE        S ON L.id_state_key     = S.id_fsm_state_key
        JOIN T_FSM_TYPE         T ON S.id_fsm_type_key  = T.id_fsm_type_key 
                                AND T.tx_fsm_type_name  = 'LOAN'
        JOIN T_USER             U ON U.id_user_key      = H.id_creator_key   
    END

    IF ( @tx_action_name = 'SELECT_LOAN_OF_ONE_USER' )
    BEGIN
        SELECT tx_rs_type = 'RS_TYPE_LOAN_FOR_GRID'
        , L.*
        , C.*        
        , S.tx_state_name
        , S.tx_display_text as tx_state_display_label
        , T.tx_fsm_type_name
        , 1 AS int_permission
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key
        WHERE L.id_creator_key          = @id_user_mod_key
        AND L.tx_account_no             = ISNULL(@tx_account_no              ,L.tx_account_no)
        AND C.tx_bp_no                  = ISNULL(@tx_bp_no                   ,C.tx_bp_no)
        AND C.tx_nid                    = ISNULL(@tx_nid                     ,C.tx_nid)
        AND C.tx_mobile                 = ISNULL(@tx_phone                   ,C.tx_mobile)
        AND L.tx_loan_tracking_id       = ISNULL(@tx_loan_tracking_id        ,L.tx_loan_tracking_id)
        AND L.dtt_create               >= ISNULL(CAST(@tx_from_date AS DATE) ,L.dtt_create)
        AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)   ,L.dtt_create)
        AND L.tx_application_no         = ISNULL(@tx_application_no          ,L.tx_application_no)
        AND L.is_active     = 1
        AND C.is_active     = 1
        ORDER BY L.id_loan_key DESC
    END
    
    IF ( @tx_action_name = 'SELECT_FULL_LOAN' )
    BEGIN   
        SELECT L.*
        INTO #TMP_LOAN
        FROM T_LOAN L
        WHERE id_loan_key = @id_loan_key
        AND is_active = 1

        SELECT @tx_group_id_dec = (SELECT tx_loan_group_id FROM #TMP_LOAN)

        IF(@tx_group_id_dec IS NULL OR @tx_group_id_dec = '?')
        BEGIN
            SELECT tx_rs_type = 'RS_TYPE_LOAN' ,TL.*
            , C.tx_value1 AS tx_loan_type 
            , C.tx_value3 AS tx_loan_prefix 
            , S.tx_state_name
            , S.tx_display_text as tx_state_display_label
            FROM #TMP_LOAN TL
            JOIN T_FSM_STATE S ON TL.id_state_key = S.id_fsm_state_key
            JOIN T_CONFIGURATION C ON C.id_configuration_key = TL.id_loan_type_key
        END
        ELSE 
        BEGIN           
            SELECT tx_rs_type = 'RS_TYPE_LOAN' ,TL.*
            , C.tx_value1 AS tx_loan_type 
            , C.tx_value3 AS tx_loan_prefix 
            , S.tx_state_name
            , S.tx_display_text as tx_state_display_label
            , ST.tx_state_name as tx_group_state
            FROM #TMP_LOAN TL
            JOIN T_FSM_STATE S ON TL.id_state_key = S.id_fsm_state_key
            JOIN T_CONFIGURATION C ON C.id_configuration_key = TL.id_loan_type_key
            JOIN T_LOAN_GROUP LG ON LG.tx_loan_group_id = TL.tx_loan_group_id
            JOIN T_FSM_STATE ST ON ST.id_fsm_state_key = LG.id_state_key
        END

        SELECT @id_customer_key = (SELECT id_customer_key FROM #TMP_LOAN)
         
        SELECT tx_rs_type = 'RS_TYPE_CUSTOMER' , C.* 
        FROM T_CUSTOMER C
        WHERE C.id_customer_key =  @id_customer_key
        AND C.is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_EXISTING_LIABILITY' , L.*
        FROM  T_EXISTING_LIABILITY L
        WHERE id_loan_key = @id_loan_key
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_CIB_STATUS' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'LOAN'
        AND tx_comment_type = 'CIB_STATUS'
        AND id_ref_key = @id_loan_key
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_ANALYSTS_COMMENTS' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'LOAN'
        AND tx_comment_type = 'ANALYSTS_COMMENTS'
        AND id_ref_key = @id_loan_key
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_EXCEPTION_DETAILS' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'LOAN'
        AND tx_comment_type = 'EXCEPTION_DETAILS'
        AND id_ref_key = @id_loan_key
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_INSTRUCTION_TO_CAD' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'LOAN'
        AND tx_comment_type = 'INSTRUCTION_TO_CAD'
        AND id_ref_key = @id_loan_key
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_COMMENTS_JUSTIFICATION' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'LOAN'
        AND tx_comment_type = 'COMMENTS_JUSTIFICATION'
        AND id_ref_key = @id_loan_key
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_COMMENTS_WAIVER_SOUGHT' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'LOAN'
        AND tx_comment_type = 'COMMENTS_WAIVER_SOUGHT'
        AND id_ref_key = @id_loan_key
        AND is_active = 1             

        SELECT  tx_rs_type = 'RS_TYPE_BM_RECOMMENDATION' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'LOAN'
        AND tx_comment_type = 'BM_RECOMMENDATION'
        AND id_ref_key = @id_loan_key
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_SO_RECOMMENDATION' , C.*
        FROM  T_COMMENT C
        WHERE tx_object_type = 'LOAN'
        AND tx_comment_type = 'SO_RECOMMENDATION'
        AND id_ref_key = @id_loan_key
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_LOAN_DOCUMENT' , D.*
        FROM  T_LOAN_DOCUMENT D
        WHERE id_loan_key = @id_loan_key
        AND tx_doc_type != 'CIB_STATUS'
        AND is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_LOAN_DOC_CIB_STATUS' , D.*
        FROM  T_LOAN_DOCUMENT D
        WHERE id_loan_key = @id_loan_key
        AND tx_doc_type = 'CIB_STATUS'
        AND is_active = 1

        SELECT TOP 1 tx_rs_type = 'RS_TYPE_MANAGER', USR.tx_login_name  AS tx_user_name, USR.tx_designation
        FROM T_LOAN_AUDIT AU join T_FSM_STATE ST ON ST.id_fsm_state_key=AU.id_state_key
        JOIN T_USER USR ON USR.id_user_key=AU.id_user_mod_key
        WHERE id_loan_key = @id_loan_key
        AND 
        (
            ST.tx_state_name = 'RM_APPROVED' 
            OR ST.tx_state_name = 'RM_RE_APPROVED' 
            OR ST.tx_state_name = 'UH_APPROVED'
            OR ST.tx_state_name = 'UH_RE_APPROVED' 
            OR 
            (
                ST.tx_state_name = 'RM_RECOMMENDED' 
                OR ST.tx_state_name = 'UH_RECOMMENDED'
                AND 
                (
                    SELECT tx_role_name FROM T_ROLE ROL 
                    WHERE ROL.id_role_key = AU.int_recommend_group_key
                ) = 'HO_CRM'
            )
        )
        ORDER BY AU.dtt_mod DESC

    END 
    
    IF ( @tx_action_name in( 'STATE_TRANSITION', 'RM_C_APPROVE', 'RM_APPROVE'
        , 'RM_RETURN', 'CA_RETURN', 'RM_RECOMMEND', 'MIS_RETURN'
        , 'UH_RETURN', 'UH_RECOMMEND', 'HOCRM_RETURN', 'HOCRM_RECOMMEND', 'BM_RECOMMEND'
        , 'BM_RETURN', 'BOM_RECOMMEND', 'BOM_RETURN', 'PPC_RECOMMEND', 'PPC_RETURN', 'CEO_RETURN', 'APPROVED_RETURN', 'CAD_RETURN', 'CAD_QUERY_TO_SO', 'CAD_QUERY_TO_CA','CAD_DISBURSE') )
    BEGIN


        set @tx_action_name = @tx_ui_action_name
        --X_CHECK_STATE_TRANSITION('LOAN', @tx_action_name, @id_action_key, @tx_state_name, @id_state_key)

    EXEC @g_id_return_status = GET_fsm_next_state 
                                  @tx_fsm_type_name     = 'LOAN'
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


        ------------------------------SET APPLICATION NO IF PULL/RECEIVE --------------------------------
        IF(@tx_ui_action_name = 'MIS_RECEIVE'  OR @tx_ui_action_name ='CA_RECEIVE')
        BEGIN
            DECLARE @l_tx_app_id VARCHAR(16)
            
            SELECT @l_tx_app_id = tx_application_no 
            FROM T_LOAN
            WHERE id_loan_key = @id_loan_key

            IF(@l_tx_app_id IN (NULL, '?', ''))
            BEGIN
                declare @l_loan_prefix varchar(4)
                    , @l_prefix_suffix varchar(1)
                -- get laon prefix from configuration      
                select @l_loan_prefix = tx_value3 from T_CONFIGURATION where id_configuration_key = @id_loan_type_key
                set @l_prefix_suffix = case when @tx_bp_no is not null and @l_loan_prefix like 'P%' then 'P' else '' end

                set @tx_application_no = @l_loan_prefix + @l_prefix_suffix + @tx_application_no
            END
        END
        --------------------------------------------------------------

        if(@int_recommend_to_key is null)
        BEGIN
            set @int_recommend_to_key = -2147483648
        END
        IF(@int_recommend_group_key IS NULL)
        BEGIN
            SET @int_recommend_group_key = -2147483648
        END

        UPDATE T_LOAN
        SET id_loan_ver  = id_loan_ver + 1
        , dtt_mod = getdate()
        , id_user_mod_key  = @id_user_mod_key
        , tx_application_no = ISNULL(@tx_application_no, tx_application_no)
        , id_state_key = @id_state_key
        , id_action_key = @id_action_key

        , int_recommend_group_key = @int_recommend_group_key
        , int_recommend_to_key = @int_recommend_to_key


        where id_loan_key = @id_loan_key

        set @tx_action_name = 'X_INGORE_ACTION'

    END

    IF ( @tx_action_name = 'SELECT_LOAN_LIKE_SPECIFIC_STATE')
    BEGIN
        SELECT tx_rs_type = 'RS_TYPE_LOAN' ,
        L.* 
        FROM T_LOAN_AUDIT L
        JOIN T_FSM_STATE S on S.id_fsm_state_key = L.id_state_key
        WHERE L.id_loan_key = @id_loan_key
        AND S.tx_state_name LIKE ('%' + @tx_state_name + '%')
    END

    IF ( @tx_action_name = 'FO_BULK_SUBMIT')
    BEGIN
        DECLARE @ll_id_state_key INT = 
        (
            SELECT id_fsm_state_key FROM T_FSM_STATE S
            JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
            WHERE tx_state_name = 'FO_SUBMITTED'
        )

        SELECT LineNumber = [Index], loan_id = Item
        INTO #TMP_LOAN_ID_LIST
        FROM dbo.SplitStrings_Ordered(@tx_loan_ids, ',') AS x;

        UPDATE T_LOAN
        SET id_loan_ver  = id_loan_ver + 1
        , dtt_mod = getdate()
        , id_user_mod_key  = @id_user_mod_key
        , id_state_key = @ll_id_state_key
        WHERE id_loan_key IN (SELECT loan_id FROM #TMP_LOAN_ID_LIST)
    END

    IF ( @tx_action_name = 'UPDATE_SL_GENERATE_COUNT')
    BEGIN
        UPDATE T_LOAN
        SET id_loan_ver  = id_loan_ver + 1
        , dtt_mod = getdate()
        , int_sl_generate_cnt = int_sl_generate_cnt + 1
        , id_user_mod_key  = @id_user_mod_key
        WHERE id_loan_key = @id_loan_key
    END

    IF ( @tx_action_name IN( 'NEW', 'FO_CREATE', 'SO_CREATE') )
    BEGIN   
        SELECT  LE.id_legal_entity_key AS id_legal_entity_key
        , LE.tx_legal_entity_name AS tx_sourcing_brc
        , U.tx_cbs_user_id AS tx_staff_id
        INTO #TEMP_CREATOR_INFO
        FROM T_USER U
        JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = U.id_legal_entity_key
        where U.id_user_key = @id_user_mod_key

        SET @id_legal_entity_key = (SELECT id_legal_entity_key FROM #TEMP_CREATOR_INFO)
        SET @tx_sourcing_brc = (SELECT tx_sourcing_brc FROM #TEMP_CREATOR_INFO)
        SET @tx_staff_id = (SELECT tx_staff_id FROM #TEMP_CREATOR_INFO)
        

        EXEC @g_id_return_status = INS_loan

            @tx_action_name     = @tx_action_name

    , @is_active            = @is_active
    , @id_env_key           = @id_env_key               OUTPUT
    , @id_user_mod_key      = @id_user_mod_key          OUTPUT
    , @dtt_mod              = @dtt_mod                  OUTPUT

    , @id_state_key         = @id_state_key             OUTPUT
    , @tx_state_name        = @tx_state_name            OUTPUT
    , @id_action_key        = @id_action_key            OUTPUT

    , @id_event_key         = @id_event_key             OUTPUT
    , @id_event_map1_key    = @id_event_map1_key        OUTPUT
    , @id_event_map2_key    = @id_event_map2_key        OUTPUT
    , @id_event_map3_key    = @id_event_map3_key        OUTPUT
    , @id_event_map4_key    = @id_event_map4_key        OUTPUT

    , @dtt_valid_from       = @dtt_valid_from
    , @dtt_valid_to         = @dtt_valid_to
    , @dtt_as_at            = @dtt_as_at
    , @dtt_last_refresh     = @dtt_last_refresh

    , @is_sel_data          = @is_sel_data
    , @tx_log_level         = @tx_log_level
    , @id_log_level         = @id_log_level
    , @is_record_time       = @is_record_time
    , @is_print_msg         = @is_print_msg
    , @is_persist_msg       = @is_persist_msg
    , @tx_json_log_msg      = @tx_json_log_msg          OUTPUT
            , @id_loan_key                 =  @id_loan_key        OUTPUT
            , @id_loan_ver                     =  @id_loan_ver 

            , @id_creator_key               = @id_creator_key
            , @dtt_create                   = @dtt_create
            , @id_customer_key              = @id_customer_key      OUTPUT

            , @tx_application_no            = @tx_application_no 
            , @id_loan_type_key             = @id_loan_type_key
            , @id_customer_type_key         = @id_customer_type_key
            , @dec_applied_loan_amount      = @dec_applied_loan_amount
            , @tx_loan_purpose              = @tx_loan_purpose
            , @int_over_loan                = @int_over_loan
            , @dec_net_monthly_income       = @dec_net_monthly_income
            , @dec_tenor_year               = @dec_tenor_year
            , @dec_existing_loan_amount     = @dec_existing_loan_amount
            , @dec_interest_rate            = @dec_interest_rate
            , @dec_total_emi                = @dec_total_emi
            , @dec_monthly_installment      = @dec_monthly_installment
            , @dec_disposable_income        = @dec_disposable_income
            , @tx_propose_emi_date          = @tx_propose_emi_date
            , @tx_duplications              = @tx_duplications
            , @dtt_cib_generation_date      = @dtt_cib_generation_date
            , @dec_proposed_dbr             = @dec_proposed_dbr
            , @dec_allowed_dbr              = @dec_allowed_dbr
            , @tx_cib_status                = @tx_cib_status
            , @dec_price_quotation_amount   = @dec_price_quotation_amount
            , @tx_bank_participation        = @tx_bank_participation
            , @dec_business_recommended_amnt= @dec_business_recommended_amnt
            , @dec_recommended_for_approval = @dec_recommended_for_approval

            , @tx_security                  = @tx_security   
            , @tx_dob_of_pg_year            = @tx_dob_of_pg_year
            , @tx_guarantor_elibiblity      = @tx_guarantor_elibiblity
            , @dtt_dob_of_pg                = @dtt_dob_of_pg  
            , @dec_remaining_amt_aft_eml    = @dec_remaining_amt_aft_eml
            , @dec_gross_salary_per_month   = @dec_gross_salary_per_month
            , @tx_borrower_participation    = @tx_borrower_participation 
            , @id_legal_entity_key          = @id_legal_entity_key
            , @id_customer_ver              = @id_customer_ver
            , @tx_name_of_guarantor         = @tx_name_of_guarantor
            , @tx_relationship_with_applicant = @tx_relationship_with_applicant
            , @tx_relationship_with_pg      = @tx_relationship_with_pg
            , @tx_data_source               = @tx_data_source
            , @tx_loan_tracking_id          = @tx_loan_tracking_id
            , @int_sl_generate_cnt          = @int_sl_generate_cnt
            , @tx_verification_email        = @tx_verification_email
            , @int_recommend_group_key      = @int_recommend_group_key
            , @int_recommend_to_key         = @int_recommend_to_key
            , @int_approved_by_key          = @int_approved_by_key
            , @tx_condition                 = @tx_condition

            , @tx_guarantor_nid             = @tx_guarantor_nid
            , @tx_staff_id                  = @tx_staff_id
            , @tx_sourcing_brc              = @tx_sourcing_brc

            , @dec_gPF_amount               = @dec_gPF_amount
            , @dtt_group_create             = @dtt_group_create
            , @tx_mobile_guarantor          = @tx_mobile_guarantor   
            , @int_top_up                    = @int_top_up   
            , @tx_account_no                = @tx_account_no  
            , @dec_guarantor_earnings       = @dec_guarantor_earnings   
            , @tx_cib_report_status_list    = @tx_cib_report_status_list

        SELECT @g_tx_err_msg = 'Error calling SP -> [INS_loan] '
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

    IF ( @tx_action_name = 'SELECT' )
    BEGIN
        EXEC @g_id_return_status = SEL_loan
         
            @tx_action_name     = @tx_action_name

    , @is_active            = @is_active
    , @id_env_key           = @id_env_key               OUTPUT
    , @id_user_mod_key      = @id_user_mod_key          OUTPUT
    , @dtt_mod              = @dtt_mod                  OUTPUT

    , @id_state_key         = @id_state_key             OUTPUT
    , @tx_state_name        = @tx_state_name            OUTPUT
    , @id_action_key        = @id_action_key            OUTPUT

    , @id_event_key         = @id_event_key             OUTPUT
    , @id_event_map1_key    = @id_event_map1_key        OUTPUT
    , @id_event_map2_key    = @id_event_map2_key        OUTPUT
    , @id_event_map3_key    = @id_event_map3_key        OUTPUT
    , @id_event_map4_key    = @id_event_map4_key        OUTPUT

    , @dtt_valid_from       = @dtt_valid_from
    , @dtt_valid_to         = @dtt_valid_to
    , @dtt_as_at            = @dtt_as_at
    , @dtt_last_refresh     = @dtt_last_refresh

    , @is_sel_data          = @is_sel_data
    , @tx_log_level         = @tx_log_level
    , @id_log_level         = @id_log_level
    , @is_record_time       = @is_record_time
    , @is_print_msg         = @is_print_msg
    , @is_persist_msg       = @is_persist_msg
    , @tx_json_log_msg      = @tx_json_log_msg          OUTPUT
            , @id_loan_key                 =  @id_loan_key        
            , @id_loan_ver                     =  @id_loan_ver 

            , @id_creator_key                   =    @id_creator_key                
            , @dtt_create                       =    @dtt_create                    
            , @id_customer_key                  =    @id_customer_key               
            , @tx_application_no                =    @tx_application_no             
            , @id_loan_type_key                 =    @id_loan_type_key              
            , @id_customer_type_key             =    @id_customer_type_key          
            , @dec_applied_loan_amount          =    @dec_applied_loan_amount       
            , @tx_loan_purpose                  =    @tx_loan_purpose               
            , @int_over_loan                    =    @int_over_loan                 
            , @dec_net_monthly_income           =    @dec_net_monthly_income        
            , @dec_tenor_year                   =    @dec_tenor_year                
            , @dec_existing_loan_amount         =    @dec_existing_loan_amount      
            , @dec_interest_rate                =    @dec_interest_rate             
            , @dec_total_emi                    =    @dec_total_emi                 
            , @dec_monthly_installment          =    @dec_monthly_installment       
            , @dec_disposable_income            =    @dec_disposable_income         
            , @tx_propose_emi_date              =    @tx_propose_emi_date           
            , @tx_duplications                  =    @tx_duplications               
            , @dtt_cib_generation_date          =    @dtt_cib_generation_date       
            , @dec_proposed_dbr                 =    @dec_proposed_dbr              
            , @dec_allowed_dbr                  =    @dec_allowed_dbr               
            , @tx_cib_status                    =    @tx_cib_status                 
            , @dec_price_quotation_amount       =    @dec_price_quotation_amount    
            , @tx_bank_participation            =    @tx_bank_participation         
            , @dec_business_recommended_amnt    =    @dec_business_recommended_amnt 
            , @dec_recommended_for_approval     =    @dec_recommended_for_approval  
            , @tx_security                      =    @tx_security                   
            , @tx_dob_of_pg_year                =    @tx_dob_of_pg_year             
            , @tx_guarantor_elibiblity          =    @tx_guarantor_elibiblity       
            , @dtt_dob_of_pg                    =    @dtt_dob_of_pg                 
            , @dec_remaining_amt_aft_eml        =    @dec_remaining_amt_aft_eml     
            , @dec_gross_salary_per_month       =    @dec_gross_salary_per_month    
            , @tx_borrower_participation        =    @tx_borrower_participation     
            , @id_legal_entity_key              =    @id_legal_entity_key           
            , @id_customer_ver                  =    @id_customer_ver               
            , @tx_name_of_guarantor             =    @tx_name_of_guarantor          
            , @tx_relationship_with_applicant   =    @tx_relationship_with_applicant
            , @tx_relationship_with_pg          =    @tx_relationship_with_pg       
            , @tx_data_source                   =    @tx_data_source                
            , @tx_loan_tracking_id              =    @tx_loan_tracking_id           
            , @tx_verification_email            =    @tx_verification_email         
            , @int_recommend_group_key          =    @int_recommend_group_key       
            , @int_recommend_to_key             =    @int_recommend_to_key          
            , @int_approved_by_key              =    @int_approved_by_key           
            , @tx_condition                     =    @tx_condition                  
            , @int_sl_generate_cnt              =    @int_sl_generate_cnt           
            , @tx_staff_id                      =    @tx_staff_id                   
            , @dec_gPF_amount                   =    @dec_gPF_amount                
            , @tx_guarantor_nid                 =    @tx_guarantor_nid              
            , @tx_sourcing_brc                  =    @tx_sourcing_brc               
            , @tx_loan_group_id                 =    @tx_loan_group_id              
            , @dtt_group_create                 =    @dtt_group_create   
            , @tx_mobile_guarantor              =    @tx_mobile_guarantor      
            , @int_top_up                       =    @int_top_up  
            , @tx_account_no                    =    @tx_account_no  
            , @dec_guarantor_earnings           = @dec_guarantor_earnings  
            , @tx_cib_report_status_list        = @tx_cib_report_status_list

        SELECT @g_tx_err_msg = 'Error calling SP -> [SEL_loan] '
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

    IF (@tx_action_name IN( 'DELETE', 'FO_DELETE', 'SO_DELETE','CA_DELETE'))
    BEGIN 
        SELECT  @tx_action_name = 'UPDATE'
        , @is_active = 0
    END

    IF( @tx_action_name IN( 'UPDATE', 'FO_UPDATE', 'SO_UPDATE', 'FO_SUBMIT', 'SO_RECOMMEND',
    'SO_RE_RECOMMEND', 'MIS_UPDATE', 'MIS_ALLOCATE', 'MIS_RE_ALLOCATE', 'CA_UPDATE', 'CA_RECOMMEND', 'CA_RE_RECOMMEND', 'SO_CAD_QUERY_UPDATE','CA_CAD_QUERY_UPDATE') )
    BEGIN
        EXEC @g_id_return_status = UPD_loan

            @tx_action_name     = @tx_action_name

    , @is_active            = @is_active
    , @id_env_key           = @id_env_key               OUTPUT
    , @id_user_mod_key      = @id_user_mod_key          OUTPUT
    , @dtt_mod              = @dtt_mod                  OUTPUT

    , @id_state_key         = @id_state_key             OUTPUT
    , @tx_state_name        = @tx_state_name            OUTPUT
    , @id_action_key        = @id_action_key            OUTPUT

    , @id_event_key         = @id_event_key             OUTPUT
    , @id_event_map1_key    = @id_event_map1_key        OUTPUT
    , @id_event_map2_key    = @id_event_map2_key        OUTPUT
    , @id_event_map3_key    = @id_event_map3_key        OUTPUT
    , @id_event_map4_key    = @id_event_map4_key        OUTPUT

    , @dtt_valid_from       = @dtt_valid_from
    , @dtt_valid_to         = @dtt_valid_to
    , @dtt_as_at            = @dtt_as_at
    , @dtt_last_refresh     = @dtt_last_refresh

    , @is_sel_data          = @is_sel_data
    , @tx_log_level         = @tx_log_level
    , @id_log_level         = @id_log_level
    , @is_record_time       = @is_record_time
    , @is_print_msg         = @is_print_msg
    , @is_persist_msg       = @is_persist_msg
    , @tx_json_log_msg      = @tx_json_log_msg          OUTPUT
            , @id_loan_key                 =  @id_loan_key        OUTPUT
            , @id_loan_ver                     =  @id_loan_ver 

            , @id_creator_key               = @id_creator_key
            , @dtt_create                   = @dtt_create
            , @id_customer_key              = @id_customer_key      OUTPUT

            , @tx_application_no            = @tx_application_no 
            , @id_loan_type_key             = @id_loan_type_key
            , @id_customer_type_key         = @id_customer_type_key
            , @dec_applied_loan_amount      = @dec_applied_loan_amount
            , @tx_loan_purpose              = @tx_loan_purpose
            , @int_over_loan                = @int_over_loan
            , @dec_net_monthly_income       = @dec_net_monthly_income
            , @dec_tenor_year               = @dec_tenor_year
            , @dec_existing_loan_amount     = @dec_existing_loan_amount
            , @dec_interest_rate            = @dec_interest_rate
            , @dec_total_emi                = @dec_total_emi
            , @dec_monthly_installment      = @dec_monthly_installment
            , @dec_disposable_income        = @dec_disposable_income
            , @tx_propose_emi_date          = @tx_propose_emi_date
            , @tx_duplications              = @tx_duplications
            , @dtt_cib_generation_date      = @dtt_cib_generation_date
            , @dec_proposed_dbr             = @dec_proposed_dbr
            , @dec_allowed_dbr              = @dec_allowed_dbr
            , @tx_cib_status                = @tx_cib_status
            , @dec_price_quotation_amount   = @dec_price_quotation_amount
            , @tx_bank_participation        = @tx_bank_participation
            , @dec_business_recommended_amnt= @dec_business_recommended_amnt
            , @dec_recommended_for_approval = @dec_recommended_for_approval

            , @tx_security                  = @tx_security   
            , @tx_dob_of_pg_year            = @tx_dob_of_pg_year
            , @tx_guarantor_elibiblity      = @tx_guarantor_elibiblity
            , @dtt_dob_of_pg                = @dtt_dob_of_pg  
            , @dec_remaining_amt_aft_eml    = @dec_remaining_amt_aft_eml
            , @dec_gross_salary_per_month   = @dec_gross_salary_per_month
            , @tx_borrower_participation    = @tx_borrower_participation 
            /*, @id_legal_entity_key          = @id_legal_entity_key*/
            , @id_customer_ver              = @id_customer_ver
            , @tx_name_of_guarantor         = @tx_name_of_guarantor
            , @tx_relationship_with_applicant = @tx_relationship_with_applicant
            , @tx_relationship_with_pg      = @tx_relationship_with_pg
            , @tx_data_source               = @tx_data_source
            , @tx_loan_tracking_id          = @tx_loan_tracking_id
            , @int_sl_generate_cnt          = @int_sl_generate_cnt
            , @tx_verification_email        = @tx_verification_email
            , @int_recommend_group_key      = @int_recommend_group_key
            , @int_recommend_to_key         = @int_recommend_to_key
            , @int_approved_by_key          = @int_approved_by_key
            , @tx_condition                 = @tx_condition
            , @tx_guarantor_nid             = @tx_guarantor_nid
            , @tx_staff_id                  = @tx_staff_id

            , @dec_gPF_amount               = @dec_gPF_amount
            , @tx_mobile_guarantor          = @tx_mobile_guarantor 
            , @int_top_up                   = @int_top_up
            , @tx_account_no                = @tx_account_no 
            , @dec_guarantor_earnings       = @dec_guarantor_earnings 
            , @tx_cib_report_status_list    = @tx_cib_report_status_list


            
        SELECT @g_tx_err_msg = 'Error calling SP -> [UPD_loan] '
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

    IF ( @tx_action_name = 'SELECT_RECOMMEND_TO_ROLE' )
    BEGIN

        DECLARE @l_id_state_key INT = (SELECT id_state_key FROM T_LOAN where id_loan_key = @id_loan_key)


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

        DECLARE @l_id_state_key_2 INT = (SELECT id_state_key FROM T_LOAN where id_loan_key = @id_loan_key)

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
    
    IF ( @tx_action_name = 'LAST_CREDIT_ANAYLST_RECOMMAND' )
    BEGIN
        
       SELECT TOP 1 tx_rs_type = 'RS_LAST_CREDIT_ANAYLST_RECOMMAND'
       ,U.tx_first_name + ' ' + U.tx_last_name as tx_user_name
       , S.tx_state_name
       FROM T_LOAN_AUDIT L
       join T_FSM_STATE S on L.id_state_key  = S.id_fsm_state_key 
       JOIN T_FSM_TYPE t ON S.id_fsm_type_key = T.id_fsm_type_key
       JOIN T_USER U ON U.id_user_key = L.id_user_mod_key
       WHERE id_loan_key = @id_loan_key
       AND (S.tx_state_name = 'CA_RECOMMENDED' ) -- ONLY RECOMMEND TAKE INTO CONSIDER
       ORDER BY L.dtt_mod DESC
    END

    IF ( @tx_action_name = 'DEPUTY_HO_CRM' )
    BEGIN
        
       SELECT TOP 1 tx_rs_type = 'RS_TYPE_DEPUTY_HO_CRM'
       ,U.tx_first_name + ' ' + U.tx_last_name as tx_deputy_ho_crm
       , S.tx_state_name
       FROM T_LOAN_AUDIT L
       join T_FSM_STATE S on L.id_state_key  = S.id_fsm_state_key 
       JOIN T_FSM_TYPE t ON S.id_fsm_type_key = T.id_fsm_type_key
       JOIN T_USER U ON U.id_user_key = L.id_user_mod_key
       WHERE id_loan_key = @id_loan_key
       AND (S.tx_state_name = 'CA_RECOMMENDED' ) 
       ORDER BY L.dtt_mod DESC
    END

    IF ( @tx_action_name = 'SELECT_STAFF_ID' )
    BEGIN
        SELECT TOP 1  tx_rs_type = 'RS_TYPE_STAFF_ID', tx_staff_id FROM T_LOAN
        WHERE id_loan_key = @id_loan_key ORDER BY dtt_mod DESC
    END

    IF ( @tx_action_name = 'UPDATE_STAFF_ID' )
    BEGIN
         UPDATE T_LOAN 
         SET id_loan_ver  = id_loan_ver + 1
         , tx_staff_id = @tx_staff_id 
         WHERE id_loan_key = @id_loan_key
    END

    IF ( @tx_action_name = 'LOAD_DATA_SOURCE' )
    BEGIN
        SELECT DISTINCT tx_rs_type = 'RS_TYPE_DATA_SOURCE',  tx_data_source FROM T_LOAN
    END

    IF ( (@tx_action_name = 'CREATE_LOAN_GROUP') OR (@tx_action_name = 'ADD_LOAN_TO_LOAN_GROUP'))
    BEGIN
     
        SELECT  @l_tmp_loan_state_key = (SELECT id_state_key FROM T_LOAN WHERE id_loan_key = @id_loan_key)
        SELECT  @l_tmp_loan_state_name = (SELECT tx_state_name FROM T_FSM_STATE WHERE id_fsm_state_key = @l_tmp_loan_state_key)

        UPDATE      T_LOAN 
        SET id_loan_ver  = id_loan_ver + 1
        , tx_loan_group_id = @tx_loan_group_id
        , id_loan_group_creator_key = @id_user_mod_key 
        , dtt_group_create=@dtt_group_create
        , int_in_group = 1
        WHERE       id_loan_key = @id_loan_key 
        AND         (tx_loan_group_id IS NULL OR tx_loan_group_id = '?')
        AND         @l_tmp_loan_state_name IN ('RM_APPROVED', 'UH_APPROVED','HOCRM_APPROVED')
         
    END

    IF ( @tx_action_name = 'CIB_STATUS_UPDATE') 
    BEGIN
        SELECT @dtt_cib_generation_date = GETDATE()
        UPDATE      T_LOAN 
        SET id_loan_ver  = id_loan_ver + 1 
        , dtt_cib_generation_date = @dtt_cib_generation_date
        , dtt_mod = @dtt_cib_generation_date
        , tx_cib_report_status_list              = ISNULL(@tx_cib_report_status_list              ,tx_cib_report_status_list)
        WHERE       id_loan_key = @id_loan_key
    END

    IF ( @tx_action_name = 'REMOVE_LOAN_FROM_LOAN_GROUP' )
    BEGIN

        SELECT  @l_tmp_loan_state_key = (SELECT id_state_key FROM T_LOAN WHERE id_loan_key = @id_loan_key)
        SELECT  @l_tmp_loan_state_name = (SELECT tx_state_name FROM T_FSM_STATE WHERE id_fsm_state_key = @l_tmp_loan_state_key)

        UPDATE      T_LOAN 
        SET id_loan_ver  = id_loan_ver + 1  
        , tx_loan_group_id = NULL
        , id_loan_group_creator_key = NULL 
        , int_in_group = 2
        WHERE       id_loan_key = @id_loan_key 
        AND         tx_loan_group_id = @tx_loan_group_id
        AND         @l_tmp_loan_state_name IN ('RM_APPROVED', 'UH_APPROVED','HOCRM_APPROVED')
    END

    IF(@tx_ui_action_name = 'CAD_RETURN')
    BEGIN
        UPDATE T_LOAN 
        SET id_loan_ver  = id_loan_ver + 1
        , tx_application_no ='?'
        , int_in_group = 2
        , tx_loan_group_id = '?'
        where id_loan_key = @id_loan_key
    END

    IF(@tx_action_name = 'SELECT_ALL_LOAN_GROUP_DATA' OR @tx_action_name = 'SEARCH_LOAN_GROUP_DATA')
    BEGIN

        SELECT tx_rs_type = 'RS_TYPE_LOAN_GROUP_FOR_GRID'
            , L.*
            , C.*   
            , C.tx_district
            , C.tx_division 
            , S.tx_state_name
            , S.tx_display_text as tx_state_display_label
            , T.tx_fsm_type_name
            , LE.tx_legal_entity_name
            , USR.tx_login_name  AS tx_creator_name
            , U.tx_login_name  AS tx_loan_group_creator
            , L.tx_loan_group_id as tx_folder_name
            , LG.id_state_key as id_group_state_key
        FROM T_LOAN L
        JOIN  T_LOAN_group LG ON LG.tx_loan_group_id = L.tx_loan_group_id
        JOIN T_FSM_STATE S ON LG.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = L.id_legal_entity_key
        JOIN T_USER USR ON USR.id_user_key = L.id_creator_key
        JOIN T_USER U ON U.id_user_key = L.id_loan_group_creator_key
        WHERE L.tx_loan_tracking_id  = ISNULL(@tx_loan_tracking_id        , L.tx_loan_tracking_id)
        AND L.dtt_group_create      >= ISNULL(CAST(@tx_from_date AS DATE) , L.dtt_group_create)
        AND CAST(L.dtt_group_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_group_create)
        AND L.tx_loan_group_id = ISNULL(@tx_loan_group_id, L.tx_loan_group_id)
        AND L.tx_loan_group_id IS NOT NULL 
        AND L.tx_loan_group_id NOT IN ('', '?')
        AND L.is_active     = 1
        ORDER BY L.dtt_mod, L.tx_loan_group_id DESC 
    END
    IF(@tx_action_name = 'SELECT_FOR_ADD_TO_LOAN_GROUP')
    BEGIN
        SELECT tx_rs_type = 'RS_TYPE_LOAN_GROUP_FOR_GRID' 
            , L.*
            , C.*       
            , C.tx_district
            , C.tx_division 
            , S.tx_state_name
            , S.tx_display_text as tx_state_display_label
            , T.tx_fsm_type_name
            , LE.tx_legal_entity_name
            , USR.tx_login_name  AS tx_creator_name
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = L.id_legal_entity_key
        JOIN T_USER USR ON USR.id_user_key = L.id_creator_key
        WHERE L.tx_loan_tracking_id  = ISNULL(@tx_loan_tracking_id        ,L.tx_loan_tracking_id)
        AND L.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_create)
        AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_create)
        AND (L.tx_loan_group_id IS NULL OR L.tx_loan_group_id IN ('', '?') )
        AND S.tx_state_name IN ('RM_APPROVED', 'UH_APPROVED','HOCRM_APPROVED')
        AND L.is_active     = 1
        ORDER BY L.dtt_mod, L.tx_loan_group_id DESC 
    END

    IF(@tx_action_name = 'SEARCH_LOAN_FOR_ELOAN')
    BEGIN
       SELECT DISTINCT
        tx_rs_type = 'RS_TYPE_SEARCH_LOAN_FOR_ELOAN',
        L.*
        , C.tx_customer_name
        , C.tx_bp_no
        , C.tx_nid
        , st.tx_state_name
        FROM T_LOAN L
        JOIN T_USER U ON L.id_user_mod_key=U.id_user_key
        Join T_CUSTOMER C on L.id_customer_key=C.id_customer_key
        JOIN T_FSM_STATE ST ON ST.id_fsm_state_key=L.id_state_key 
        WHERE  L.tx_account_no = (@tx_account_no)
        OR C.tx_bp_no        = (@tx_bp_no)
        OR C.tx_nid          = (@tx_nid)
        OR C.tx_mobile       = (@tx_phone)
        OR L.tx_loan_tracking_id  = (@tx_loan_tracking_id) 
        ORDER BY L.dtt_create DESC
    END
    IF(@tx_action_name = 'SEARCH_MY_LOAN_FOR_ELOAN')BEGIN
        SELECT DISTINCT
        tx_rs_type = 'RS_TYPE_SEARCH_LOAN_FOR_ELOAN',
        L.*
        , C.tx_customer_name
        , C.tx_bp_no
        , C.tx_nid
        , S.tx_state_name
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_ROLE_STATE_MAP M ON M.id_fsm_state_key = S.id_fsm_state_key and M.is_active = 1
        JOIN T_ROLE R ON R.id_role_key = M.id_role_key
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        WHERE   C.tx_customer_name   = (@tx_customer_name)
        OR L.tx_account_no = (@tx_account_no)
        OR C.tx_bp_no        = (@tx_bp_no)
        OR C.tx_nid          = (@tx_nid)
        OR C.tx_mobile       = (@tx_phone)
        OR L.tx_loan_tracking_id  = (@tx_loan_tracking_id)
        AND  R.id_role_key IN 
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
        AND L.is_active = 1
        ORDER by L.dtt_create desc
    END
    IF ( @tx_action_name = 'SELECT_ELOAN_STATUS_GRID_DATA')
    BEGIN
        CREATE TABLE #T_TMP_STATE (
            state_name_store varchar(256) NULL
        )

        INSERT INTO #T_TMP_STATE
        SELECT state_name_store = splitdata FROM dbo.fnSplitString(@tx_el_search_sate, ',')

        
        SELECT DISTINCT id_loan_key AS id_to_keep_distinct
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
        , M.int_permission
        INTO #TEMP_ELOAN_GRID_DATA
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_ROLE_STATE_MAP M ON M.id_fsm_state_key = S.id_fsm_state_key and M.is_active = 1
        JOIN T_ROLE R ON R.id_role_key = M.id_role_key
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        WHERE R.id_role_key IN 
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
        AND L.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_create)
        AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_create)
        AND EXISTS (SELECT state_name_store FROM #T_TMP_STATE WHERE state_name_store = S.tx_state_name)
        AND L.is_active     = 1
        ORDER BY L.dtt_create DESC

        SELECT LG.*
        , LE.tx_legal_entity_name
        , USR.tx_login_name  AS tx_creator_name
        INTO #TEMP_ELOAN_GRID_DATA_EL
        FROM #TEMP_ELOAN_GRID_DATA LG
        JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = LG.id_legal_entity_key
        JOIN T_USER USR ON USR.id_user_key = LG.id_creator_key

        SELECT tx_rs_type = 'RS_TYPE_ELOAN_FOR_GRID', tx_loan_tracking_id ,* FROM 
        (
            SELECT *,ROW_NUMBER() OVER (ORDER BY dtt_create DESC) AS 'int_row_number'
            FROM #TEMP_ELOAN_GRID_DATA_EL
        ) AS X
        WHERE int_row_number > (@int_start_value-1) * @int_limit_value
        AND int_row_number <= @int_start_value * @int_limit_value

        SELECT DISTINCT tx_rs_type = 'RS_TYPE_LOAN_COUNT', COUNT(*) AS int_total_count
        FROM #TEMP_ELOAN_GRID_DATA_EL
    END
    IF ( @tx_action_name = 'DUPLICATE_LOAN_CHECK_SAME_BP')
    BEGIN
        select tx_rs_type = 'RS_TYPE_LOAN_CHECK_SAME_BP',
        count(C.tx_bp_no) As int_duplicate_count_same_bp
        , C.tx_bp_no
        from T_LOAN L
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key
        where C.tx_bp_no        = ISNULL(@tx_bp_no      ,C.tx_bp_no)
        group by C.tx_bp_no
    END
    IF ( @tx_action_name = 'SELECT_LOAN_FOR_SMS')
    BEGIN
        select tx_rs_type = 'RS_TYPE_SELECT_LOAN_FOR_SMS'
        , L.*
        , C.*
        , S.tx_state_name
        , S.id_fsm_state_key
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON S.id_fsm_state_key = L.id_state_key
        JOIN T_CUSTOMER C On C.id_customer_key = L.id_customer_key
        where L.dtt_mod >= DATEADD(HOUR, -12, GETDATE())
        AND L.dtt_mod <  DATEADD(HOUR, -0, GETDATE())
        AND S.tx_state_name  IN ('SENT_TO_CAD','CAD_DISBURSED')
        AND L.id_loan_key NOT IN(SELECT id_loan_key  FROM T_LMS_SMS WHERE tx_sms_status IN('SENT_TO_KAFKA','GW_PENDING','GW_SKIPPED','SENT_TO_SMS_CLIENT','TELCO_SENT','TELCO_ERROR','FAILED_TO_SENT'))
        AND L.is_active = 1
    END
    IF ( @tx_action_name = 'SELECT_LOAN_FOR_MANUAL_SMS_SEND')
    BEGIN
       CREATE TABLE #T_TMP_SMS_SEND_LOAN (
                loan_id INT NULL
            )

            INSERT INTO #T_TMP_SMS_SEND_LOAN
            SELECT loan_id = splitdata FROM dbo.fnSplitString(@tx_loan_id_list, ',')

        select tx_rs_type = 'RS_TYPE_SELECT_LOAN_FOR_SMS'
        , L.*
        , C.*
        , S.tx_state_name
        , S.id_fsm_state_key
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON S.id_fsm_state_key = L.id_state_key
        JOIN T_CUSTOMER C On C.id_customer_key = L.id_customer_key
        where EXISTS (SELECT loan_id FROM #T_TMP_SMS_SEND_LOAN WHERE loan_id = L.id_loan_key)
        AND S.tx_state_name  IN ('SENT_TO_CAD','CAD_DISBURSED')     
        AND L.is_active = 1
    END
    IF(@tx_action_name = 'SELECT_ELOAN_GRID_DATA')
    BEGIN
        SELECT DISTINCT id_loan_key AS id_to_keep_distinct
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
        , M.int_permission
        INTO #TEMP_ELOAN_GRID_DATA1
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_ROLE_STATE_MAP M ON M.id_fsm_state_key = S.id_fsm_state_key and M.is_active = 1
        JOIN T_ROLE R ON R.id_role_key = M.id_role_key
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        WHERE R.id_role_key IN 
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
        AND L.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_create)
        AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_create)
        AND L.is_active     = 1
        ORDER BY L.dtt_create DESC

        SELECT LG.*
        , LE.tx_legal_entity_name
        , USR.tx_login_name  AS tx_creator_name
        INTO #TEMP_ELOAN_GRID_DATA_EL1
        FROM #TEMP_ELOAN_GRID_DATA1 LG
        JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = LG.id_legal_entity_key
        JOIN T_USER USR ON USR.id_user_key = LG.id_creator_key

        SELECT tx_rs_type = 'RS_TYPE_ELOAN_FOR_GRID', tx_loan_tracking_id ,* FROM 
        (
            SELECT *,ROW_NUMBER() OVER (ORDER BY dtt_create DESC) AS 'int_row_number'
            FROM #TEMP_ELOAN_GRID_DATA_EL1
        ) AS X
        WHERE int_row_number > (@int_start_value-1) * @int_limit_value
        AND int_row_number <= @int_start_value * @int_limit_value 

        SELECT DISTINCT tx_rs_type = 'RS_TYPE_LOAN_COUNT', COUNT(*) AS int_total_count
        FROM #TEMP_ELOAN_GRID_DATA_EL1
    END
    IF ( @tx_action_name = 'SELECT_ELOAN_DETAILS_VIEW')
    BEGIN
        SELECT La.tx_loan_tracking_id
        , LA.dtt_create
        , LA.dtt_mod
        , S.tx_state_name
        , U.tx_login_name
        INTO #TEMP_ELOAN_DETAILS
        FROM T_LOAN_AUDIT LA
        Join T_FSM_STATE S On S.id_fsm_state_key = LA.id_state_key
        Join T_USER U On U.id_user_key = LA.id_user_mod_key
        WHERE LA.id_loan_key = @id_loan_key

        SELECT tx_rs_type = 'RS_TYPE_ELOAN_DETAILS_VIEW'
        , tx_loan_tracking_id
        , tx_state_name
        , max(dtt_mod) as dtt_mod
        , tx_login_name,dtt_create
        from #TEMP_ELOAN_DETAILS PD 
        group by tx_loan_tracking_id
        , tx_state_name
        , CAST(dtt_mod as date)
        , tx_login_name,dtt_create
        ORDER BY dtt_mod asc

        SELECT tx_rs_type = 'RS_TYPE_STATE_LIST'
        , tx_state_name  as tx_state_list
        FROM T_FSM_STATE
    END
    IF(@tx_action_name = 'LOAD_USER_ELOAN_GRID_DATA')
    BEGIN
        SELECT  tx_rs_type = 'RS_TYPE_LOAN_FOR_GRID'
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
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_USER  USR ON USR.id_user_key  = L.id_creator_key
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        WHERE   USR.id_user_key = @id_user_mod_key
        AND L.is_active     = 1
        ORDER BY L.dtt_create DESC
    END

    IF(@tx_action_name = 'SELECT_LOAN_FROM_GROUP')
    BEGIN
        SELECT tx_rs_type = 'RS_TYPE_LOAN_GROUP_FOR_GRID' 
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
        FROM T_LOAN L
        JOIN  T_LOAN_group LG ON LG.tx_loan_group_id = L.tx_loan_group_id
        JOIN T_FSM_STATE S ON LG.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        JOIN T_LEGAL_ENTITY LE ON LE.id_legal_entity_key = L.id_legal_entity_key
        JOIN T_USER USR ON USR.id_user_key = L.id_creator_key
        JOIN T_USER U ON U.id_user_key = L.id_loan_group_creator_key
        WHERE L.tx_loan_group_id  = ISNULL(@tx_loan_group_id        ,L.tx_loan_group_id)
        AND L.is_active     = 1
        ORDER BY L.dtt_mod, L.tx_loan_group_id DESC 
    END
    IF(@tx_action_name = 'SELECT_GROUP_TOTAL_AMOUNT')
    BEGIN
        SELECT tx_rs_type = 'RS_TYPE_TOTAL_AMOUNT'
        , SUM(CASE 
        WHEN (T.dec_recommended_for_approval=-2147483648.00)  THEN 0                   
            ELSE T.dec_recommended_for_approval
            END
         ) AS dec_total_group_amount       
        FROM T_LOAN T
          where tx_loan_group_id = @tx_loan_group_id;
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
        where LG.tx_loan_group_id = @tx_loan_group_id;
    END
    IF(@tx_action_name = 'SELECT_FOR_DUPLICATE_CHECK')
    BEGIN 
        SELECT  C.tx_nid
        , C.tx_tin
        , C.tx_bp_no
        , L.tx_account_no
        INTO #TEMP_CUST_DATA
        FROM T_LOAN L
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key
        WHERE L.id_loan_key = @id_loan_key
        AND L.is_active = 1
        AND L.is_active = 1

        SET @tx_account_no  = (SELECT  tx_account_no FROM #TEMP_CUST_DATA);
        SET @tx_nid         = (SELECT  tx_nid        FROM #TEMP_CUST_DATA);
        SET @tx_tin         = (SELECT  tx_tin        FROM #TEMP_CUST_DATA);
        SET @tx_bp_no       = (SELECT  tx_bp_no      FROM #TEMP_CUST_DATA);

        IF(@id_loan_key IS NOT NULL)
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
        AND L.id_loan_key      != ISNULL(@id_loan_key , L.id_loan_key)
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
        FROM T_CREDIT_CARD      L
        JOIN T_CUSTOMER         C ON C.id_customer_key  = L.id_customer_key
        JOIN T_FSM_STATE FS ON  FS.id_fsm_state_key     = L.id_state_key
        JOIN T_CONFIGURATION CI ON CI.id_configuration_key = L.id_card_type_key
        WHERE FS.tx_state_name  IN('PRE_APPROVED', 'HOCRM_APPROVE','RM_APPROVE','UH_APPROVE')
        AND L.tx_account_no     = ISNULL(@tx_account_no ,L.tx_account_no)
        AND C.tx_bp_no          = ISNULL(@tx_bp_no      ,C.tx_bp_no)
        AND C.tx_nid            = ISNULL(@tx_nid        ,C.tx_nid)
        AND C.tx_tin            = ISNULL(@tx_tin        ,C.tx_tin)
        AND L.is_active         = 1
        AND C.is_active         = 1
    END
    IF ( (@g_is_record_time = 1) )
        SELECT @g_dtt_proc_end = GETDATE()
    IF ( (@g_is_record_time = 1) )
        SELECT @g_dtt_tot_elapsed  = datediff(ss, @g_dtt_proc_start, @g_dtt_proc_end)

    SELECT @g_tx_err_msg = 'Exiting[ACT_Loan] : @tx_action[' + ISNULL(@tx_action_name, '?') + ']'
    SELECT @g_dtt_log = GETDATE(), @g_tx_sp_name = 'ACT_loan.sp', @g_id_line_num = 2304

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

GRANT EXECUTE ON ACT_Loan TO app_ro, app_rw
    go