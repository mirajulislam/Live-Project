/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 24 DEC 2019
* Description   : 
*****************************************************************************************/
    


EXEC DROP_db_object @tx_db_object_type = 'P', @tx_db_object_name = 'ACT_customer'
    go

IF ('CREATE' = 'CREATE')
        PRINT '**** WARNING : CREATING SP ****'
    ELSE IF ('CREATE' = 'ALTER')
        PRINT '**** WARNING : ALTER SP ****'
    ELSE
        PRINT '**** WARNING : UNKNOWN TABLE PROC ****'
    go

    CREATE PROC ACT_customer
    
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

    , @id_customer_key                       INT                    = NULL      OUTPUT
    , @id_customer_ver                           INT                    = NULL       OUTPUT

    , @tx_customer_id                    VARCHAR(256)           = NULL      
    , @tx_bp_no                          VARCHAR(256)           = NULL      
    , @tx_customer_name                  VARCHAR(256)           = NULL
    , @tx_designation                    VARCHAR(256)           = NULL
    , @tx_current_posting_place          VARCHAR(256)           = NULL
    , @dtt_date_of_birth                 DATETIME               = NULL
    , @tx_age                            VARCHAR(256)           = NULL
    , @dtt_joining_date                  DATETIME               = NULL
    , @tx_service_length                 VARCHAR(256)           = NULL
    , @dtt_retirement_date               DATETIME               = NULL
    , @tx_remaining_year_of_retirement   VARCHAR(256)           = NULL
    , @tx_nid                            VARCHAR(256)           = NULL
    , @tx_tin                            VARCHAR(256)           = NULL
    , @tx_account_no                     VARCHAR(256)           = NULL
    , @int_salary_disbursed_with_cbbl    INT                    = NULL
    , @tx_marital_status                 VARCHAR(256)           = NULL
    , @tx_cif                            VARCHAR(256)           = NULL
    , @tx_mother_name                    VARCHAR(256)           = NULL
    , @tx_father_name                    VARCHAR(256)           = NULL
    , @tx_spouse                         VARCHAR(256)           = NULL
    , @tx_house_ownership                VARCHAR(256)           = NULL
    , @tx_permanet_addr                  VARCHAR(256)           = NULL
    , @tx_office_addr                    VARCHAR(256)           = NULL
    , @tx_mobile                        VARCHAR(256)           = NULL
    , @tx_emer_phone                    VARCHAR(256)           = NULL
    , @tx_is_matched_nid                VARCHAR(256)           = NULL
    , @tx_customer_type                 VARCHAR(256)           = NULL
    , @id_customer_type_key             INT                    = NULL
    , @tx_name_in_bangla                NVARCHAR(256)          = NULL
    , @tx_alternative_mobile            VARCHAR(16)           = NULL
    , @tx_office_id                     VARCHAR(256)           = NULL
    , @tx_district                      VARCHAR(48)            = NULL 
    , @tx_division                      VARCHAR(48)            = NULL
    , @tx_unit_1                        VARCHAR(48)            = NULL
    , @tx_unit_2                        VARCHAR(48)            = NULL
    , @tx_search_Date_Of_Birth          VARCHAR(48)            = NULL
    , @dt_last_date_of_posting          DATE                    = NULL
    , @tx_district_of_posting           VARCHAR(64)             = NULL
    , @tx_name_as_per_nid               VARCHAR(256)            = NULL
    , @tx_name_as_per_bp_civ_id         VARCHAR(256)            = NULL
    , @tx_customer_posting_district     VARCHAR(256)            = NULL
    , @tx_customer_posting_division     VARCHAR(256)            = NULL
    , @tx_passport_no                   VARCHAR(256)            = NULL
    , @tx_highest_level_of_education    VARCHAR(256)            = NULL
    , @dt_passpord_expiry_date          DATE                    = NULL
    , @tx_email                         VARCHAR(64)             = NULL
    , @tx_kyc_level                     VARCHAR(64)             = NULL
    , @tx_card_monthly_bill_debited     VARCHAR(256)             = NULL
    , @row_select                       INT                    = NULL

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
        EXEC @g_id_return_status = GET_sp_log_level @tx_sp_name='ACT_customer', @tx_log_level=@tx_log_level OUTPUT, @id_log_level=@id_log_level OUTPUT, @is_record_time=@is_record_time OUTPUT, @is_print_msg=@is_print_msg OUTPUT, @is_persist_msg=@is_persist_msg OUTPUT
    END

    SELECT @g_is_record_time = @is_record_time, @g_is_print_msg = @is_print_msg, @g_is_persist_msg  = @is_persist_msg, @g_id_log_level = @id_log_level

    SELECT @g_tx_err_msg = 'Entering[ACT_customer] : @tx_action[' + ISNULL(@tx_action_name, '?') + ']'
    SELECT @g_dtt_log = GETDATE(), @g_tx_sp_name = 'ACT_customer.sp', @g_id_line_num = 190

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

    IF ( @tx_action_name IN('NEW', 'UPDATE'))
    BEGIN
        IF ( (@dtt_date_of_birth IS NOT NULL) AND (@tx_age IS NULL) )
        BEGIN
            select @tx_age = dbo.calculateDateDiff(@dtt_date_of_birth, GETDATE()) 
        END
        IF ( (@dtt_joining_date IS NOT NULL) AND (@tx_service_length IS NULL) )
        BEGIN
            select @tx_service_length = dbo.calculateDateDiff(@dtt_joining_date, GETDATE())
        END
        IF ( (@dtt_retirement_date IS NOT NULL) AND (@tx_remaining_year_of_retirement IS NULL) )
        BEGIN
            select @tx_remaining_year_of_retirement = dbo.calculateDateDiff(@dtt_retirement_date, GETDATE())
        END
    END
    
    
    IF ( @tx_action_name = 'SELECT_USER' )
    BEGIN
        SELECT tx_rs_type = 'RS_TYPE_USER'
                 , U.*  
        FROM T_USER U
        WHERE id_user_mod_key = @id_user_mod_key
    END

  IF ( @tx_action_name = 'NEW' )
  BEGIN

    DECLARE @l_id_customer_key INT = 
    (
        SELECT TOP(1) id_customer_key 
        FROM T_CUSTOMER 
        WHERE tx_customer_id = @tx_customer_id
        AND is_active = 1
        ORDER BY dtt_mod DESC
    )

    IF(@l_id_customer_key IS NOT NULL)
    BEGIN
        SELECT  @tx_action_name = 'UPDATE'

       SELECT @id_customer_key = @l_id_customer_key
    END
    ELSE
    BEGIN

        EXEC @g_id_return_status = INS_customer

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
        , @id_customer_key                         =  @id_customer_key        OUTPUT
        , @id_customer_ver                             =  @id_customer_ver            OUTPUT

        , @tx_customer_id                       = @tx_customer_id       

        , @tx_bp_no                             = @tx_bp_no
        , @tx_customer_name                     = @tx_customer_name
        , @tx_designation                       = @tx_designation
        , @tx_current_posting_place             = @tx_current_posting_place
        , @dtt_date_of_birth                    = @dtt_date_of_birth
        , @tx_age                               = @tx_age
        , @dtt_joining_date                     = @dtt_joining_date
        , @tx_service_length                    = @tx_service_length
        , @dtt_retirement_date                  = @dtt_retirement_date
        , @tx_remaining_year_of_retirement      = @tx_remaining_year_of_retirement

        , @tx_nid                               = @tx_nid
        , @tx_tin                               = @tx_tin
        , @tx_account_no                        = @tx_account_no
        , @int_salary_disbursed_with_cbbl       = @int_salary_disbursed_with_cbbl
        , @tx_marital_status                    = @tx_marital_status
        , @tx_cif                               = @tx_cif
        , @tx_mother_name                       = @tx_mother_name
        , @tx_father_name                       = @tx_father_name
        , @tx_spouse                            = @tx_spouse
        , @tx_house_ownership                   = @tx_house_ownership
        , @tx_permanet_addr                     = @tx_permanet_addr  
        , @tx_office_addr                       = @tx_office_addr
        , @tx_mobile                            = @tx_mobile
        , @tx_emer_phone                        = @tx_emer_phone
        , @tx_is_matched_nid                    = @tx_is_matched_nid
        , @id_customer_type_key                 = @id_customer_type_key
        , @tx_name_in_bangla                    = @tx_name_in_bangla
        , @tx_alternative_mobile                = @tx_alternative_mobile
        , @tx_office_id                         = @tx_office_id
        , @tx_district                          = @tx_district
        , @tx_division                          = @tx_division
        , @tx_unit_1                            = @tx_unit_1   
        , @tx_unit_2                            = @tx_unit_2 
        , @dt_last_date_of_posting              = @dt_last_date_of_posting 
        , @tx_district_of_posting               = @tx_district_of_posting 
        , @tx_name_as_per_nid                   = @tx_name_as_per_nid
        , @tx_name_as_per_bp_civ_id             = @tx_name_as_per_bp_civ_id
        , @tx_customer_posting_district         = @tx_customer_posting_district
        , @tx_customer_posting_division         = @tx_customer_posting_division
        , @tx_passport_no                       = @tx_passport_no
        , @tx_highest_level_of_education        = @tx_highest_level_of_education
        , @dt_passpord_expiry_date              = @dt_passpord_expiry_date
        , @tx_email                             = @tx_email
        , @tx_kyc_level                         = @tx_kyc_level
        , @tx_card_monthly_bill_debited         = @tx_card_monthly_bill_debited   
    END  

    SELECT @g_tx_err_msg = 'Error calling SP -> [INS_customer] '
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
    EXEC @g_id_return_status = SEL_customer
    
     @tx_action_name        = @tx_action_name

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
    , @id_customer_key                         =  @id_customer_key       
    , @id_customer_ver                             =  @id_customer_ver        

    , @tx_customer_id                       = @tx_customer_id

    , @tx_bp_no                             = @tx_bp_no
    , @tx_customer_name                     = @tx_customer_name
    , @tx_designation                       = @tx_designation
    , @tx_current_posting_place             = @tx_current_posting_place
    , @dtt_date_of_birth                    = @dtt_date_of_birth
    , @tx_age                               = @tx_age
    , @dtt_joining_date                     = @dtt_joining_date
    , @tx_service_length                    = @tx_service_length
    , @dtt_retirement_date                  = @dtt_retirement_date
    , @tx_remaining_year_of_retirement      = @tx_remaining_year_of_retirement

    , @tx_nid                               = @tx_nid
    , @tx_tin                               = @tx_tin
    , @tx_account_no                        = @tx_account_no
    , @int_salary_disbursed_with_cbbl       = @int_salary_disbursed_with_cbbl
    , @tx_marital_status                    = @tx_marital_status
    , @tx_cif                               = @tx_cif
    , @tx_mother_name                       = @tx_mother_name
    , @tx_father_name                       = @tx_father_name
    , @tx_spouse                            = @tx_spouse
    , @tx_house_ownership                   = @tx_house_ownership
    , @tx_permanet_addr                     = @tx_permanet_addr  
    , @tx_office_addr                       = @tx_office_addr
    , @tx_mobile                            = @tx_mobile
    , @tx_emer_phone                        = @tx_emer_phone
    , @tx_is_matched_nid                    = @tx_is_matched_nid
    , @id_customer_type_key                 = @id_customer_type_key
    , @tx_name_in_bangla                    = @tx_name_in_bangla
    , @tx_alternative_mobile                = @tx_alternative_mobile
    , @tx_office_id                         = @tx_office_id
    , @tx_unit_1                            = @tx_unit_1   
    , @tx_unit_2                            = @tx_unit_2
    , @dt_last_date_of_posting              = @dt_last_date_of_posting 
    , @tx_district_of_posting               = @tx_district_of_posting 
    , @tx_name_as_per_nid                   = @tx_name_as_per_nid
    , @tx_name_as_per_bp_civ_id             = @tx_name_as_per_bp_civ_id
    , @tx_customer_posting_district         = @tx_customer_posting_district
    , @tx_customer_posting_division         = @tx_customer_posting_division
    , @tx_passport_no                       = @tx_passport_no
    , @tx_highest_level_of_education        = @tx_highest_level_of_education
    , @dt_passpord_expiry_date              = @dt_passpord_expiry_date
    , @tx_email                             = @tx_email
    , @tx_kyc_level                         = @tx_kyc_level
    , @tx_card_monthly_bill_debited         = @tx_card_monthly_bill_debited
    SELECT @g_tx_err_msg = 'Error calling SP -> [SEL_customer] '
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

  IF (@tx_action_name = 'DELETE')
  BEGIN 
    SELECT  @tx_action_name = 'UPDATE'
    , @is_active = 0
  END

  IF( @tx_action_name = 'UPDATE' )
  BEGIN
    EXEC @g_id_return_status = UPD_customer

     @tx_action_name        = @tx_action_name

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
    , @id_customer_key                         =  @id_customer_key        OUTPUT 
    , @id_customer_ver                             =  @id_customer_ver            OUTPUT    
    
    , @tx_customer_id                       = @tx_customer_id       

    , @tx_bp_no                             = @tx_bp_no
    , @tx_customer_name                     = @tx_customer_name
    , @tx_designation                       = @tx_designation
    , @tx_current_posting_place             = @tx_current_posting_place
    , @dtt_date_of_birth                    = @dtt_date_of_birth
    , @tx_age                               = @tx_age
    , @dtt_joining_date                     = @dtt_joining_date
    , @tx_service_length                    = @tx_service_length
    , @dtt_retirement_date                  = @dtt_retirement_date
    , @tx_remaining_year_of_retirement      = @tx_remaining_year_of_retirement

    , @tx_nid                               = @tx_nid
    , @tx_tin                               = @tx_tin
    , @tx_account_no                        = @tx_account_no
    , @int_salary_disbursed_with_cbbl       = @int_salary_disbursed_with_cbbl
    , @tx_marital_status                    = @tx_marital_status
    , @tx_cif                               = @tx_cif
    , @tx_mother_name                       = @tx_mother_name
    , @tx_father_name                       = @tx_father_name
    , @tx_spouse                            = @tx_spouse
    , @tx_house_ownership                   = @tx_house_ownership
    , @tx_permanet_addr                     = @tx_permanet_addr  
    , @tx_office_addr                       = @tx_office_addr
    , @tx_mobile                            = @tx_mobile
    , @tx_emer_phone                        = @tx_emer_phone
    , @tx_is_matched_nid                    = @tx_is_matched_nid
    , @id_customer_type_key                 = @id_customer_type_key
    , @tx_name_in_bangla                    = @tx_name_in_bangla
    , @tx_alternative_mobile                = @tx_alternative_mobile
    , @tx_office_id                         = @tx_office_id
    , @tx_district                          = @tx_district
    , @tx_division                          = @tx_division
    , @tx_unit_1                            = @tx_unit_1   
    , @tx_unit_2                            = @tx_unit_2
    , @dt_last_date_of_posting              = @dt_last_date_of_posting 
    , @tx_district_of_posting               = @tx_district_of_posting 
    , @tx_name_as_per_nid                   = @tx_name_as_per_nid
    , @tx_name_as_per_bp_civ_id             = @tx_name_as_per_bp_civ_id
    , @tx_customer_posting_district         = @tx_customer_posting_district
    , @tx_customer_posting_division         = @tx_customer_posting_division
    , @tx_passport_no                       = @tx_passport_no
    , @tx_highest_level_of_education        = @tx_highest_level_of_education
    , @dt_passpord_expiry_date              = @dt_passpord_expiry_date
    , @tx_email                             = @tx_email
    , @tx_kyc_level                         = @tx_kyc_level
    , @tx_card_monthly_bill_debited         = @tx_card_monthly_bill_debited
    SELECT @g_tx_err_msg = 'Error calling SP -> [UPD_customer] '
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

 IF( @tx_action_name = 'SEARCH_NID_DETAILS_FOR_COMPARE' )
  BEGIN
    SELECT  tx_rs_type = 'RS_TYPE_CUSTOMER_NID_DETAILS' , C.* from T_CUSTOMER C where 
    CAST(C.dtt_date_of_birth AS DATE) <= ISNULL(CAST(@tx_search_Date_Of_Birth AS DATE)  ,C.dtt_date_of_birth)
    AND C.tx_nid          = ISNULL(@tx_nid        ,C.tx_nid)
    AND C.is_active=1
  END
  IF( @tx_action_name = 'CUSTOMER_SEARCH_WITH_SEND_OTP')
    BEGIN
            SET @row_select = (SELECT count(id_user_key) as row_select from T_USER_REGISTRATION
            WHERE tx_mobile LIKE '+88%'+(@tx_mobile)
            OR tx_mobile LIKE (@tx_mobile)
            AND is_active = 1)

            if(@row_select <1)
            BEGIN
                    SELECT  tx_rs_type = 'RS_TYPE_CUSTOMER' , C.* from T_CUSTOMER C 
                    WHERE  C.tx_mobile LIKE '+88%'+(@tx_mobile)
                    OR  C.tx_mobile LIKE (@tx_mobile)
                    AND CAST(C.dtt_date_of_birth AS DATE) = ISNULL(CAST(@dtt_date_of_birth AS DATE) ,C.dtt_date_of_birth)       
                    AND C.is_active=1      
            END
            else
            BEGIN
                    SELECT  tx_rs_type = 'RS_TYPE_CUSTOMER' ,@row_select AS row_select
            END
    END
    IF( @tx_action_name = 'CUSTOMER_SEARCH_FOR_CREATE_LOAN')
    BEGIN
            SELECT  tx_rs_type = 'RS_TYPE_CUSTOMER' 
            , C.* 
            FROM T_CUSTOMER C 
            WHERE C.tx_mobile LIKE '+88%'+(@tx_mobile)
            OR  C.tx_mobile LIKE (@tx_mobile)
            AND C.is_active=1
            ORDER BY dtt_mod desc
    END
    IF ( (@g_is_record_time = 1) )
        SELECT @g_dtt_proc_end = GETDATE()
    IF ( (@g_is_record_time = 1) )
        SELECT @g_dtt_tot_elapsed  = datediff(ss, @g_dtt_proc_start, @g_dtt_proc_end)

    SELECT @g_tx_err_msg = 'Exiting[ACT_customer] : @tx_action[' + ISNULL(@tx_action_name, '?') + ']'
    SELECT @g_dtt_log = GETDATE(), @g_tx_sp_name = 'ACT_customer.sp', @g_id_line_num = 811

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

GRANT EXECUTE ON ACT_customer TO app_ro, app_rw
    go