/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Assaduzzaman Sohan
* Date          : 11 FEB 2021
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_run_status};
#define _TABLE_NAME     {T_RUN_STATUS};
#define _PRIMARY_KEY    {id_run_status_key};
#define _VERSION        {id_run_status_ver};


_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
  _SP_PARAM_HEADER
    @tx_action_name    VARCHAR(128) = NULL
  , @id_run_status_key INTEGER     = NULL
  , @id_run_status_ver INTEGER     = NULL
  , @dtt_mod           DATETIME    = NULL
  , @dtt_status        DATETIME    = NULL
  , @int_successfull   INTEGER     = NULL
  , @int_failed        INTEGER     = NULL
  , @int_crashed       INTEGER     = NULL
  , @int_blind         INTEGER     = NULL
  , @tx_run_type       VARCHAR(32) = NULL

   _SP_PARAM_FOOTER

AS

{
  _SP_HEADER

  DECLARE @dt_today DATE = (SELECT CAST (GETDATE() AS DATE))

  IF( @tx_action_name = 'KEEP_FULL_RUN_STATUS')
  {
    SELECT @int_blind = (
      select count(1) as int_count from T_ORG_JOB_SITE with(nolock) 
      where tx_run_status = 'BLIND'
    )
    SELECT @int_crashed = (
      select count(1) as int_count from T_ORG_JOB_SITE with(nolock) 
      where tx_run_status = 'CRASHED'
    )
    SELECT @int_failed = (
      select count(1) as int_count from T_ORG_JOB_SITE with(nolock) 
      where tx_run_status = 'FAILED'
    )
    SELECT @int_successfull = (
      select count(1) as int_count from T_ORG_JOB_SITE with(nolock) 
      where tx_run_status = 'SUCCESSFUL'
    )

    SELECT @dtt_status = (
      SELECT dtt_status FROM T_RUN_STATUS WITH(NOLOCK)
      WHERE tx_run_type = 'FULL_RUN'
    )

    IF(@dt_today = @dtt_status)
    {
      _SET_ACTION(_ACTION_UPDATE)
    }
    ELSE
    {
      SELECT @dtt_status = @dt_today
      SELECT @tx_run_type = 'FULL_RUN'
      _SET_ACTION(_ACTION_NEW)
    }
  }

  IF ( @tx_action_name = 'KEEP_QUICK_RUN_STATUS' )
  {
    SELECT @int_blind = (
      select count(1) as int_count from T_QUICK_RUN_STATUS with(nolock) 
      where tx_quick_run_status = 'BLIND'
    )
    SELECT @int_crashed = (
      select count(1) as int_count from T_QUICK_RUN_STATUS with(nolock) 
      where tx_quick_run_status = 'CRASHED'
    )
    SELECT @int_failed = (
      select count(1) as int_count from T_QUICK_RUN_STATUS with(nolock) 
      where tx_quick_run_status = 'FAILED'
    )
    SELECT @int_successfull = (
      select count(1) as int_count from T_QUICK_RUN_STATUS with(nolock) 
      where tx_quick_run_status = 'SUCCESSFUL'
    )

    SELECT @dtt_status = (
      SELECT dtt_status FROM T_RUN_STATUS WITH(NOLOCK)
      WHERE tx_run_type = 'QUICK_RUN'
    )

    IF(@dt_today = @dtt_status)
    {
      _SET_ACTION(_ACTION_UPDATE)
    }
    ELSE
    {
      SELECT @dtt_status = @dt_today
      SELECT @tx_run_type = 'QUICK_RUN'
      _SET_ACTION(_ACTION_NEW)
    }
  }

  IF ( @tx_action_name = _ACTION_NEW )
  {
    INSERT INTO _TABLE_NAME
    (
        id_run_status_ver
      , dtt_mod           
      , dtt_status    
      , int_successfull  
      , int_failed        
      , int_crashed       
      , int_blind     
      , tx_run_type       
    )
    VALUES
    (
       0
      , ISNULL(@id_run_status_ver  , 0)
      , ISNULL(@dtt_mod            , GETDATE())
      , ISNULL(@dtt_status         , '2019-20-01')
      , ISNULL(@int_successfull    , 0)
      , ISNULL(@int_failed         , 0)
      , ISNULL(@int_crashed        , 0)
      , ISNULL(@int_blind          , 0)
      , ISNULL(@tx_run_type        , '?')
    )

    RETURN _STATUS_OK 
  }   

  IF ( @tx_action_name = _ACTION_SELECT )
  {
    SELECT  tx_rs_type = 'RS_TYPE_RUN_STATUS'
    , R.*
    FROM  _TABLE_NAME R
    WHERE id_run_status_key = ISNULL(@id_run_status_key   ,id_run_status_key)
    AND   tx_run_type       = ISNULL(@tx_run_type         , tx_run_type)
    AND   CAST(dtt_status)  = ISNULL(@dtt_status          , dtt_status)  
  }

  IF (@tx_action_name = _ACTION_DELETE)
  { 
    DELETE FROM T_RUN_STATUS
    WHERE id_run_status_key = @id_run_status_key
  }

  IF( @tx_action_name = _ACTION_UPDATE )
  {
    UPDATE _TABLE_NAME
    SET 
    , id_run_status_ver     = ISNULL(@id_run_status_ver   ,id_run_status_ver)
    , dtt_mod               = ISNULL(@dtt_mod             ,dtt_mod)
    , dtt_status            = ISNULL(@dtt_status          ,dtt_status)
    , int_successfull       = ISNULL(@int_successfull     ,int_successfull)
    , int_failed            = ISNULL(@int_failed          ,int_failed)
    , int_crashed           = ISNULL(@int_crashed         ,int_crashed)
    , int_blind             = ISNULL(@int_blind           ,int_blind)
    , tx_run_type           = ISNULL(@tx_run_type         ,tx_run_type)

    WHERE   id_run_status_key      = @id_run_status_key
  }

  _SP_FOOTER
}
go

_GRANT_PERM_SP