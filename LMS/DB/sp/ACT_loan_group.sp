/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islamn
* Date          : 10 OCT 2021
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_loan_group};
#define _TABLE_NAME     {T_LOAN_GROUP};
#define _PRIMARY_KEY    {id_loan_group_key};
#define _VERSION        {id_loan_group_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

    , @_PRIMARY_KEY                         INT                         =  NULL       OUTPUT
    , @_VERSION                             INT                         =  NULL

    , @tx_loan_group_id                     VARCHAR(256)                =  NULL
    , @tx_card_group_id                     VARCHAR(256)                =  NULL
    , @tx_comment                           VARCHAR(256)                =  NULL
    , @tx_ui_action_name                    VARCHAR(256)                =  NULL
    , @tx_ho_crm_comment                    VARCHAR(256)                =  NULL
    , @tx_cad_comment                       VARCHAR(256)                =  NULL
    , @dtt_group_create                     DATETIME                    =  NULL
    , @dec_total_group_amount               DECIMAL(20,2)               =  NULL
    , @total_loan_this_group                INT                         =  NULL

    _SP_PARAM_FOOTER

AS
{
    _SP_HEADER

    IF (@tx_action_name IN ('CREATE_LOAN_GROUP'))
    {   
        _CHECK_STATE_TRANSITION('LOAN')
    }

    IF ( @tx_action_name IN( 'STATE_TRANSITION'))
    {
        set @tx_action_name = @tx_ui_action_name
        _CHECK_STATE_TRANSITION('LOAN')
    }
    IF ( @tx_action_name IN( 'CREATE_CARD_GROUP'))
    {
        _CHECK_STATE_TRANSITION('CREDIT_CARD')
    }
    IF ( @tx_action_name IN( 'STATE_TRANSITION_CARD'))
    {
        set @tx_action_name = @tx_ui_action_name
        _CHECK_STATE_TRANSITION('CREDIT_CARD')
    }

    IF ( @tx_action_name = 'CREATE_LOAN_GROUP' OR @tx_action_name = 'CREATE_CARD_GROUP')
    {
        EXEC @g_id_return_status = INS_loan_group

            _SP_ARGS_HEADER

            ,   @_PRIMARY_KEY                       = @_PRIMARY_KEY                 
            ,   @_VERSION                           = @_VERSION  
                       
            ,   @tx_loan_group_id                   = @tx_loan_group_id   
            ,   @tx_card_group_id                   = @tx_card_group_id          
            ,   @tx_ho_crm_comment                  = @tx_ho_crm_comment
            ,   @tx_cad_comment                     = @tx_cad_comment   
            ,   @dtt_group_create                   = @dtt_group_create
            ,   @dec_total_group_amount             = @dec_total_group_amount
            ,   @total_loan_this_group              = @total_loan_this_group             

            _RETURN_IF_SP_ERROR(INS_loan_group)
    }

    IF( @tx_action_name IN (_ACTION_UPDATE,'SEND_TO_MD','REJECT_FROM_GROUP','MD_APPROVED_GROUP'))
    {
        EXEC @g_id_return_status = UPD_loan_group

            _SP_ARGS_HEADER

            ,   @_PRIMARY_KEY                       = @_PRIMARY_KEY                 
            ,   @_VERSION                           = @_VERSION  
                   
            ,   @tx_loan_group_id                   = @tx_loan_group_id  
            ,   @tx_card_group_id                   = @tx_card_group_id             
            ,   @tx_ho_crm_comment                  = @tx_ho_crm_comment
            ,   @tx_cad_comment                     = @tx_cad_comment                 
            ,   @dtt_group_create                   = @dtt_group_create
            ,   @dec_total_group_amount             = @dec_total_group_amount 
            ,   @total_loan_this_group              = @total_loan_this_group             

        _RETURN_IF_SP_ERROR(UPD_loan_group) 
    }

    _SP_FOOTER
}
go

_GRANT_PERM_SP
