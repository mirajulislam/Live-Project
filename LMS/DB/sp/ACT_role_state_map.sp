/* __VER_INFO__  :  */
/******************************************************************************
* Author		: Kh. Kamruzzaman
* Date			: 2019-12-29
* Description	: 

ACT_role_state_map @tx_action_name = 'NEW', @id_user_mod_key = 100000, @tx_fsm_state_name='FO_CREATED', @tx_role_name = 'FIELD_OFFICER', @tx_comment	= ''
******************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME 			{ACT_role_state_map};
#define _TABLE_NAME 		{T_ROLE_STATE_MAP};
#define _PRIMARY_KEY		{id_role_state_map_key};
#define _VERSION			{id_role_state_map_ver};


_DROP_PROC

_CREATE_PROC (_SP_NAME)

	_SP_PARAM_HEADER

		, @_PRIMARY_KEY					int									= NULL		OUTPUT
		, @_VERSION						int									= NULL		OUTPUT
		, @id_role_key					int									= NULL
		, @id_fsm_state_key 			int									= NULL
		, @int_permission 				int									= NULL
		, @tx_comment					varchar(512)						= NULL
		
		, @tx_role_name					varchar(64)						= NULL
		, @tx_fsm_state_name			varchar(64)						= NULL

	_SP_PARAM_FOOTER
AS
{

	_SP_HEADER

	IF ( @tx_action_name = _ACTION_NEW )
	{

		SELECT @id_role_key =  id_role_key FROM T_ROLE WHERE tx_role_name = @tx_role_name

		SELECT @id_fsm_state_key =  S.id_fsm_state_key 
		FROM T_FSM_STATE S 
		JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE tx_state_name = @tx_fsm_state_name


		SELECT @_PRIMARY_KEY = _PRIMARY_KEY
		FROM _TABLE_NAME 
		where id_fsm_state_key = @id_fsm_state_key 
		and id_role_key = @id_role_key

		if(@_PRIMARY_KEY IS NULL)
		{
			if(@int_permission is null)
			{
				set @int_permission = 0
			}

			_INIT_VERSION(@_VERSION)

			INSERT INTO _TABLE_NAME
		    (
			    _VERSION
			    ,_TABLE_HEADER_INS_FIELD
			          
			    , id_role_key			                 
			    , id_fsm_state_key 	                 
			    , int_permission 		               
			    , tx_comment
		    )
		    VALUES
		    (  
			    @_VERSION
			    ,_TABLE_HEADER_INS_VAL

			    , ISNULL(@id_role_key		            , _DB_NULL_INT)
			    , ISNULL(@id_fsm_state_key             	, _DB_NULL_INT)
			    , ISNULL(@int_permission 	            , _DB_NULL_INT)
			    , ISNULL(@tx_comment		            , _DB_NULL_STR)
		    )

		    SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_ROLE_STATE_MAP')

			_STORE_SYS_VARS
			SELECT @g_tx_err_msg = _GEM_INSERT(_TABLE_NAME, @_PRIMARY_KEY)
			
			_HANDLE_ZERO_ROW_COUNT(_GEC_INSERT, @g_tx_err_msg)

			_TOUCHED_TABLE(_TABLE_NAME)
		}
		else
		{
			_SET_ACTION(_ACTION_UPDATE)
        	, @is_active = 1
		}

	}
	

	IF (@tx_action_name = _ACTION_DELETE)
	{	
		_SET_ACTION(_ACTION_UPDATE)
		, @is_active = 0
	}

	IF(@tx_action_name = _ACTION_UPDATE)
	{

		UPDATE	_TABLE_NAME
		SET		  _VERSION					= _VERSION + 1  
				, _TABLE_HEADER_UPD
				
				, int_permission 		= ISNULL(@int_permission, 		int_permission)	
				, tx_comment 			= ISNULL(@tx_comment, 			tx_comment)	
				
		WHERE	_PRIMARY_KEY	= @_PRIMARY_KEY

	}

	IF ( @tx_action_name = _ACTION_SELECT )
	{
		SELECT  tx_rs_type = 'RS_TYPE_ROLE_STATE_MAP'
		, L.*
		FROM  _TABLE_NAME L
		WHERE 	_PRIMARY_KEY        	= ISNULL(@_PRIMARY_KEY      		, _PRIMARY_KEY)
		AND 	id_role_key  			= ISNULL(@id_role_key				, id_role_key)
		AND 	id_fsm_state_key     	= ISNULL(@id_fsm_state_key			, id_fsm_state_key)
		AND 	int_permission      	= ISNULL(@int_permission			, int_permission)
		AND     is_active = 1
	}

	_SP_FOOTER
}
go


_GRANT_PERM_SP