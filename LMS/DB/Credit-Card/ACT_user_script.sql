IF(@tx_action_name = 'NEW')
	BEGIN           
            INSERT INTO T_USER
            (
                    id_user_key
                  , id_user_ver
                  , -- id_user_ver
                   is_active
                  , id_env_key
                  , id_user_mod_key
                  , dtt_mod
                  , id_event_key
                  , id_state_key
                  , id_action_key
                  , id_region_key
                  , id_group_key
                  , id_legal_entity_key
                  , tx_first_name
                  , tx_last_name
                  , tx_login_name
                  , tx_password
                  , tx_user_alias
                  , is_disabled
                  , is_allow_login
                  , is_first_login
                  , id_created_by_key
                  , tx_email
                  , is_in_vacation
                  , tx_cbs_user_id
                  , tx_designation
            )
            VALUES
            (
                    @id_user_key
                  , @id_user_ver
                  , --  ISNULL(@id_user_ver                 , 0)
                    ISNULL(@is_active                 , 1)
                  , ISNULL(@id_env_key          , 0)
                  , ISNULL(@id_user_mod_key     , 0)
                  , ISNULL(@dtt_mod             , GETDATE())
                  , ISNULL(@id_event_key        , 0)
                  , ISNULL(@id_state_key        , 0)
                  , ISNULL(@id_action_key       , 0)
                  , ISNULL(@id_region_key                   , -2147483648)
                  , ISNULL(@id_group_key                    , -2147483648)
                  , ISNULL(@id_legal_entity_key             , -2147483648)
                  , ISNULL(@tx_first_name                   , '?')
                  , ISNULL(@tx_last_name                    , '?')
                  , ISNULL(@tx_login_name                   , '?')
                  , ISNULL(@tx_password                     , '?')
                  , ISNULL(@tx_user_alias                   , '?')
                  , ISNULL(@is_disabled                     , 1)
                  , 0
                  , 1
                  , ISNULL(@id_created_by_key         , -2147483648)
                  , ISNULL(@tx_email                              ,  '?')
                  , ISNULL(@is_in_vacation                              ,  -2147483648)
                  , ISNULL(@tx_cbs_user_id                              ,  '?')
                  , ISNULL(@tx_designation                              ,  '?')
            )
END