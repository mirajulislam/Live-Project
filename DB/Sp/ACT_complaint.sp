/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul.islam
* Date          : 15 FEB 2021
* Description   : 
*****************************************************************************************/
    

EXEC DROP_db_object @tx_db_object_type = 'P', @tx_db_object_name = 'ACT_complaint'
    go

IF ('CREATE' = 'CREATE')
        PRINT '**** WARNING : CREATING SP ****'
    ELSE IF ('CREATE' = 'ALTER')
        PRINT '**** WARNING : ALTER SP ****'
    ELSE
        PRINT '**** WARNING : UNKNOWN TABLE PROC ****'
    go

    CREATE PROC ACT_complaint
    
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

    , @id_customer_complaint_key                     INT                    = NULL       OUTPUT
    , @id_customer_complaint_ver                         INT                    = NULL 

    , @dtt_txn_date                     DATETIME               = NULL
    , @dtt_create                       DATETIME               = NULL
    , @tx_atm_owner                     VARCHAR(256)           = NULL
    , @dec_txn_amount                   DECIMAL(20, 2)         = NULL
    , @tx_account_number                VARCHAR(256)           = NULL
    , @tx_card_number                   VARCHAR(256)           = NULL
    , @tx_atm_location                  VARCHAR(256)           = NULL
    , @tx_comment                       VARCHAR(256)           = NULL
    , @tx_data_source                   VARCHAR(256)           = NULL
    , @id_creator_key                   INT                    = NULL    
    , @int_tracking_number              INT                    = NULL 
    , @tx_ui_action_name                VARCHAR(256)           = NULL
    , @tx_from_date                     VARCHAR(256)           = NULL
    , @tx_to_date                       VARCHAR(256)           = NULL

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
        EXEC @g_id_return_status = GET_sp_log_level @tx_sp_name='ACT_complaint', @tx_log_level=@tx_log_level OUTPUT, @id_log_level=@id_log_level OUTPUT, @is_record_time=@is_record_time OUTPUT, @is_print_msg=@is_print_msg OUTPUT, @is_persist_msg=@is_persist_msg OUTPUT
    END

    SELECT @g_is_record_time = @is_record_time, @g_is_print_msg = @is_print_msg, @g_is_persist_msg  = @is_persist_msg, @g_id_log_level = @id_log_level

    SELECT @g_tx_err_msg = 'Entering[ACT_complaint] : @tx_action[' + ISNULL(@tx_action_name, '?') + ']'
    SELECT @g_dtt_log = GETDATE(), @g_tx_sp_name = 'ACT_complaint.sp', @g_id_line_num = 154

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
    
    IF(@id_customer_complaint_key IS NOT NULL AND @tx_action_name = 'USER_REQUESTED' )
    BEGIN
       set @tx_action_name = 'STATE_TRANSITION'
       set @tx_ui_action_name = 'USER_REQUESTED'
    END

    IF (@tx_action_name IN ('NEW_DISPUTE','USER_REQUESTED'))
    BEGIN   
        --X_CHECK_STATE_TRANSITION('ATM_DISPUTE', @tx_action_name, @id_action_key, @tx_state_name, @id_state_key)

    EXEC @g_id_return_status = GET_fsm_next_state 
                                  @tx_fsm_type_name     = 'ATM_DISPUTE'
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

    IF ( @tx_action_name in( 'STATE_TRANSITION'))
    BEGIN
        set @tx_action_name = @tx_ui_action_name
        --X_CHECK_STATE_TRANSITION('ATM_DISPUTE', @tx_action_name, @id_action_key, @tx_state_name, @id_state_key)

    EXEC @g_id_return_status = GET_fsm_next_state 
                                  @tx_fsm_type_name     = 'ATM_DISPUTE'
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

        UPDATE T_COMPLAINT
        SET id_customer_complaint_ver       = id_customer_complaint_ver + 1
        , dtt_mod           = getdate()
        , id_user_mod_key   = @id_user_mod_key
        , id_state_key      = @id_state_key
        , id_action_key     = @id_action_key
        where id_customer_complaint_key  = @id_customer_complaint_key
        AND is_active = 1

        set @tx_action_name = 'X_INGORE_ACTION'
    END


    IF ( @tx_action_name IN ('NEW_DISPUTE','USER_REQUESTED'))
    BEGIN   
        EXEC @g_id_return_status = INS_complaint

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
        , @id_customer_complaint_key                 = @id_customer_complaint_key        OUTPUT
        , @id_customer_complaint_ver                     = @id_customer_complaint_ver 

        , @dtt_txn_date                 = @dtt_txn_date 
        , @dtt_create                   = @dtt_create   
        , @tx_atm_owner                 = @tx_atm_owner 
        , @dec_txn_amount               = @dec_txn_amount       
        , @tx_account_number            = @tx_account_number            
        , @tx_card_number               = @tx_card_number       
        , @tx_atm_location              = @tx_atm_location      
        , @tx_comment                   = @tx_comment   
        , @tx_data_source               = @tx_data_source       
        , @id_creator_key               = @id_creator_key   
        , @int_tracking_number          = @int_tracking_number  

        SELECT @g_tx_err_msg = 'Error calling SP -> [INS_complaint] '
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

    IF ( @tx_action_name = 'UPDATE')
    BEGIN   
        EXEC @g_id_return_status = UPD_complaint

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
        , @id_customer_complaint_key                 =  @id_customer_complaint_key        OUTPUT
        , @id_customer_complaint_ver                     =  @id_customer_complaint_ver 

        , @dtt_txn_date                 =  @dtt_txn_date
        , @dtt_create                   =  @dtt_create
        , @tx_atm_owner                 =  @tx_atm_owner
        , @dec_txn_amount               =  @dec_txn_amount
        , @tx_account_number            =  @tx_account_number
        , @tx_card_number               =  @tx_card_number
        , @tx_atm_location              =  @tx_atm_location
        , @tx_comment                   =  @tx_comment
        , @tx_data_source               =  @tx_data_source
        , @id_creator_key               =  @id_creator_key
        , @int_tracking_number          =  @int_tracking_number  

        SELECT @g_tx_err_msg = 'Error calling SP -> [UPD_complaint] '
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

    IF ( @tx_action_name = 'DELETE_FULL_ATM_DISPUTE')
    BEGIN
        UPDATE T_COMPLAINT
        SET id_customer_complaint_ver  = id_customer_complaint_ver + 1
        , is_active = 0
        WHERE id_customer_complaint_key = @id_customer_complaint_key
    END
    IF (@tx_action_name = 'SELECT_FULL_ATM_DISPUTE')
    BEGIN
        SELECT tx_rs_type = 'RS_TYPE_SELECT_FULL_ATM_DISPUTE'
        , CL.*
        , FS.*
        FROM T_COMPLAINT CL
        JOIN T_FSM_STATE FS ON FS.id_fsm_state_key = CL.id_state_key
        JOIN T_FSM_TYPE  F ON F.id_fsm_type_key = FS.id_fsm_type_key AND F.tx_fsm_type_name = 'ATM_DISPUTE'
        WHERE id_customer_complaint_key  = @id_customer_complaint_key
        AND CL.is_active = 1
    END
    IF ( @tx_action_name = 'SELECT_ATM_DISPUTE_FOR_GRID')
    BEGIN

        DECLARE @l_tx_role_name VARCHAR(50) 

        SELECT VGR.tx_role_name , USR.id_user_key
        INTO    #TEMP_ROLE_INPUT
        FROM T_USER USR
        JOIN V_USER_GROUP VUG ON VUG.id_user_key   = USR.id_user_key
        JOIN V_GROUP_ROLE VGR ON VGR.id_group_key  = VUG.id_group_key
        WHERE USR.id_user_key =  @id_user_mod_key

        SELECT @l_tx_role_name = (SELECT tx_role_name FROM #TEMP_ROLE_INPUT)

        SELECT DISTINCT id_customer_complaint_key AS id_to_keep_distinct
        , CL.*
        , S.tx_state_name
        , S.tx_display_text as tx_state_display_label
        INTO    #TEMP_ATM_DATA
        FROM    T_COMPLAINT CL
        JOIN    T_FSM_STATE S ON CL.id_state_key    =   S.id_fsm_state_key
        JOIN    T_FSM_TYPE T ON S.id_fsm_type_key   =   T.id_fsm_type_key AND T.tx_fsm_type_name = 'ATM_DISPUTE'
        WHERE   CL.tx_atm_owner                     =   ISNULL(@tx_atm_owner                ,CL.tx_atm_owner)
        AND     CL.dtt_create                       >=  ISNULL(CAST(@tx_from_date AS DATE)  ,CL.dtt_create)
        AND     CAST(CL.dtt_create AS DATE)         <=  ISNULL(CAST(@tx_to_date AS DATE)    ,CL.dtt_create)
        AND     CL.tx_card_number                   =   ISNULL(@tx_card_number              ,CL.tx_card_number)
        AND     CL.tx_account_number                =   ISNULL(@tx_account_number           ,CL.tx_account_number)
        AND     CL.tx_atm_location                  =   ISNULL(@tx_atm_location             ,CL.tx_atm_location)
        AND     CL.is_active                        = 1
        ORDER   BY CL.dtt_mod DESC

        IF(@l_tx_role_name = 'APP_USER')
        BEGIN
            SELECT tx_rs_type = 'RS_TYPE_SELECT_ATM_DISPUTE_FOR_GRID', * 
            , tx_state_display_label as tx_folder_name
            FROM #TEMP_ATM_DATA DT
            JOIN    #TEMP_ROLE_INPUT IR ON IR.id_user_key = @id_user_mod_key    
            WHERE   DT.tx_state_name IN('REQUESTED','REJECTED','RESOLVED','NEW') 
            AND     DT.id_creator_key = @id_user_mod_key
            ORDER BY dtt_mod DESC 
        END
        ELSE
        BEGIN
            SELECT tx_rs_type = 'RS_TYPE_SELECT_ATM_DISPUTE_FOR_GRID', * 
            , tx_state_display_label as tx_folder_name
            FROM #TEMP_ATM_DATA DT
            JOIN    #TEMP_ROLE_INPUT IR ON IR.id_user_key = @id_user_mod_key    
            WHERE   DT.tx_state_name IN('REQUESTED','REJECTED','RESOLVED') 
            ORDER BY dtt_mod DESC 
        END
    END
    IF ( (@g_is_record_time = 1) )
        SELECT @g_dtt_proc_end = GETDATE()
    IF ( (@g_is_record_time = 1) )
        SELECT @g_dtt_tot_elapsed  = datediff(ss, @g_dtt_proc_start, @g_dtt_proc_end)

    SELECT @g_tx_err_msg = 'Exiting[ACT_complaint] : @tx_action[' + ISNULL(@tx_action_name, '?') + ']'
    SELECT @g_dtt_log = GETDATE(), @g_tx_sp_name = 'ACT_complaint.sp', @g_id_line_num = 693

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

GRANT EXECUTE ON ACT_complaint TO app_ro, app_rw
    go