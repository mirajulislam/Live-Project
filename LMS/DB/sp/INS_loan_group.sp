/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islamn
* Date          : 10 OCT 2021
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {INS_loan_group};
#define _TABLE_NAME     {T_LOAN_GROUP};
#define _PRIMARY_KEY    {id_loan_group_key};
#define _VERSION        {id_loan_group_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

    , @_PRIMARY_KEY                         INT                         = NULL       OUTPUT
    , @_VERSION                             INT                         = NULL

    , @tx_loan_group_id                     VARCHAR(256)                = NULL
    , @tx_card_group_id                     VARCHAR(256)                = NULL
    , @tx_ho_crm_comment                    VARCHAR(256)                = NULL
    , @tx_cad_comment                       VARCHAR(256)                = NULL
    , @dtt_group_create                     DATETIME                    = NULL
    , @dec_total_group_amount               DECIMAL(20,2)               = NULL
    , @total_loan_this_group                INT                         = NULL
    _SP_PARAM_FOOTER

AS
{
    _SP_HEADER

    _INIT_VERSION(@_VERSION)

    INSERT INTO _TABLE_NAME
    (
        id_loan_group_ver
    ,   _TABLE_HEADER_INS_FIELD_WITH_STATE

    ,   tx_loan_group_id     
    ,   tx_ho_crm_comment
    ,   tx_cad_comment               
    ,   dtt_group_create    
    ,   tx_card_group_id 
    ,   dec_total_group_amount
    ,   total_loan_this_group                   
    )
    VALUES
    (  
            @_VERSION
        ,   _TABLE_HEADER_INS_VAL_WITH_STATE

        , ISNULL(@tx_loan_group_id                 ,     _DB_NULL_STR)
        , ISNULL(@tx_ho_crm_comment                ,     _DB_NULL_STR)
        , ISNULL(@tx_cad_comment                   ,     _DB_NULL_STR)
        , ISNULL(@dtt_group_create                 ,     GETDATE())
        , ISNULL(@tx_card_group_id                 ,     _DB_NULL_STR)
        , ISNULL(@dec_total_group_amount           ,     _DB_NULL_FLOAT) 
        , ISNULL(@total_loan_this_group            ,        0)
    )

    SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_LOAN_GROUP')

    _STORE_SYS_VARS
    SELECT @g_tx_err_msg = _GEM_INSERT(_TABLE_NAME, @_PRIMARY_KEY)
    
    _HANDLE_ZERO_ROW_COUNT(_GEC_INSERT, @g_tx_err_msg)

    _TOUCHED_TABLE(_TABLE_NAME)

    _SP_FOOTER

    RETURN _STATUS_OK

}
go

_GRANT_PERM_SP