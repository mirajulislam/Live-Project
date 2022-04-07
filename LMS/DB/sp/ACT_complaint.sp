/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul.islam
* Date          : 15 FEB 2021
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_complaint};
#define _TABLE_NAME     {T_COMPLAINT};
#define _PRIMARY_KEY    {id_customer_complaint_key};
#define _VERSION        {id_customer_complaint_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

    , @_PRIMARY_KEY                     INT                    = NULL       OUTPUT
    , @_VERSION                         INT                    = NULL 

    , @dtt_txn_date 					DATETIME        	   = NULL
	, @dtt_create                       DATETIME        	   = NULL
	, @tx_atm_owner						VARCHAR(256)    	   = NULL
	, @dec_txn_amount					DECIMAL(20, 2)  	   = NULL
	, @tx_account_number				VARCHAR(256)    	   = NULL
	, @tx_card_number					VARCHAR(256)    	   = NULL
	, @tx_atm_location					VARCHAR(256)    	   = NULL
	, @tx_comment						VARCHAR(256)    	   = NULL
	, @tx_data_source					VARCHAR(256)    	   = NULL
	, @id_creator_key                   INT             	   = NULL    
    , @int_tracking_number              INT                    = NULL 
    , @tx_ui_action_name                VARCHAR(256)           = NULL
    , @tx_from_date                     VARCHAR(256)           = NULL
    , @tx_to_date                       VARCHAR(256)           = NULL

	_SP_PARAM_FOOTER

AS

{
	_SP_HEADER
    
    IF(@id_customer_complaint_key IS NOT NULL AND @tx_action_name = 'USER_REQUESTED' )
    {
       set @tx_action_name = 'STATE_TRANSITION'
       set @tx_ui_action_name = 'USER_REQUESTED'
    }

	IF (@tx_action_name IN ('NEW_DISPUTE','USER_REQUESTED'))
    {   
        _CHECK_STATE_TRANSITION('ATM_DISPUTE')
    }

    IF ( @tx_action_name in( 'STATE_TRANSITION'))
    {
        set @tx_action_name = @tx_ui_action_name
        _CHECK_STATE_TRANSITION('ATM_DISPUTE')        

        UPDATE _TABLE_NAME
        SET _VERSION  		= _VERSION + 1
        , dtt_mod 			= getdate()
        , id_user_mod_key   = @id_user_mod_key
        , id_state_key 		= @id_state_key
        , id_action_key 	= @id_action_key
        where _PRIMARY_KEY  = @_PRIMARY_KEY
        AND is_active = 1

        set @tx_action_name = 'X_INGORE_ACTION'
    }


    IF ( @tx_action_name IN ('NEW_DISPUTE','USER_REQUESTED'))
    {   
    	EXEC @g_id_return_status = INS_complaint

        _SP_ARGS_HEADER
        , @_PRIMARY_KEY                 = @_PRIMARY_KEY        OUTPUT
        , @_VERSION                     = @_VERSION 

        , @dtt_txn_date					= @dtt_txn_date	
		, @dtt_create					= @dtt_create	
		, @tx_atm_owner					= @tx_atm_owner	
		, @dec_txn_amount				= @dec_txn_amount		
		, @tx_account_number			= @tx_account_number			
		, @tx_card_number				= @tx_card_number		
		, @tx_atm_location				= @tx_atm_location		
		, @tx_comment					= @tx_comment	
		, @tx_data_source				= @tx_data_source		
		, @id_creator_key				= @id_creator_key	
        , @int_tracking_number          = @int_tracking_number	

        _RETURN_IF_SP_ERROR(INS_complaint)
    }

    IF ( @tx_action_name = _ACTION_UPDATE)
    {   
    	EXEC @g_id_return_status = UPD_complaint

        _SP_ARGS_HEADER
        , @_PRIMARY_KEY                 =  @_PRIMARY_KEY        OUTPUT
        , @_VERSION                     =  @_VERSION 

        , @dtt_txn_date					=  @dtt_txn_date
		, @dtt_create					=  @dtt_create
		, @tx_atm_owner					=  @tx_atm_owner
		, @dec_txn_amount				=  @dec_txn_amount
		, @tx_account_number			=  @tx_account_number
		, @tx_card_number				=  @tx_card_number
		, @tx_atm_location				=  @tx_atm_location
		, @tx_comment					=  @tx_comment
		, @tx_data_source				=  @tx_data_source
		, @id_creator_key				=  @id_creator_key
        , @int_tracking_number          =  @int_tracking_number  

        _RETURN_IF_SP_ERROR(UPD_complaint)
    }

    IF ( @tx_action_name = 'DELETE_FULL_ATM_DISPUTE')
    {
        UPDATE _TABLE_NAME
        SET _VERSION  = _VERSION + 1
        , is_active = 0
        WHERE _PRIMARY_KEY = @_PRIMARY_KEY
    }
    IF (@tx_action_name = 'SELECT_FULL_ATM_DISPUTE')
    {
        SELECT tx_rs_type = 'RS_TYPE_SELECT_FULL_ATM_DISPUTE'
        , CL.*
        , FS.*
        FROM T_COMPLAINT CL
        JOIN T_FSM_STATE FS ON FS.id_fsm_state_key = CL.id_state_key
        JOIN T_FSM_TYPE  F ON F.id_fsm_type_key = FS.id_fsm_type_key AND F.tx_fsm_type_name = 'ATM_DISPUTE'
        WHERE id_customer_complaint_key  = @id_customer_complaint_key
        AND CL.is_active = 1
    }
    IF ( @tx_action_name = 'SELECT_ATM_DISPUTE_FOR_GRID')
    {

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
        {
            SELECT tx_rs_type = 'RS_TYPE_SELECT_ATM_DISPUTE_FOR_GRID', * 
            , tx_state_display_label as tx_folder_name
            FROM #TEMP_ATM_DATA DT
            JOIN    #TEMP_ROLE_INPUT IR ON IR.id_user_key = @id_user_mod_key    
            WHERE   DT.tx_state_name IN('REQUESTED','REJECTED','RESOLVED','NEW') 
            AND     DT.id_creator_key = @id_user_mod_key
            ORDER BY dtt_mod DESC 
        }
        ELSE
        {
            SELECT tx_rs_type = 'RS_TYPE_SELECT_ATM_DISPUTE_FOR_GRID', * 
            , tx_state_display_label as tx_folder_name
            FROM #TEMP_ATM_DATA DT
            JOIN    #TEMP_ROLE_INPUT IR ON IR.id_user_key = @id_user_mod_key    
            WHERE   DT.tx_state_name IN('REQUESTED','REJECTED','RESOLVED') 
            ORDER BY dtt_mod DESC 
        }
    }
    _SP_FOOTER
}
go

_GRANT_PERM_SP