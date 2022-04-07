/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islamn
* Date          : 10 OCT 2021
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {UPD_loan_group};
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

    SELECT @id_loan_group_ver = (SELECT id_loan_group_ver FROM T_LOAN_GROUP WHERE tx_loan_group_id = @tx_loan_group_id OR tx_card_group_id = @tx_card_group_id)

    UPDATE _TABLE_NAME
    SET 
    _TABLE_HEADER_UPD_WITH_STATE
    ,   id_loan_group_ver           = @id_loan_group_ver    +   1
    ,   tx_loan_group_id            =   ISNULL(@tx_loan_group_id             , tx_loan_group_id    )
    ,   tx_card_group_id            =   ISNULL(@tx_card_group_id             , tx_card_group_id    )
    ,   tx_ho_crm_comment           =   ISNULL(@tx_ho_crm_comment            , tx_ho_crm_comment   )
    ,   tx_cad_comment              =   ISNULL(@tx_cad_comment               , tx_cad_comment      )   
    ,   dtt_group_create            =   ISNULL(@dtt_group_create             , dtt_group_create    )
    ,   dec_total_group_amount      =   ISNULL(@dec_total_group_amount       ,  dec_total_group_amount    )
    ,   total_loan_this_group       =   ISNULL(@total_loan_this_group        ,  total_loan_this_group    )
    WHERE tx_loan_group_id          =   @tx_loan_group_id
    OR    tx_card_group_id          =   @tx_card_group_id
      _TOUCHED_TABLE(_TABLE_NAME)

    _SP_FOOTER

    RETURN _STATUS_OK
}
go

_GRANT_PERM_SP