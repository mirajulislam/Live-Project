/* __VER_INFO__  :  */
/******************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 16 May 2019
* Description   : Store Procedure to get all data from T_CONFIGURATION table
******************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME 			{SEL_configuration};

#define _TABLE_NAME         {T_CONFIGURATION};
#define _TABLE_NAME_AUDIT   {T_CONFIGURATION_AUDIT};

#define _PRIMARY_KEY    	{id_configuration_key};
#define _VERSION        	{id_configuration_ver};

_DROP_PROC


_CREATE_PROC (_SP_NAME)
	  _SP_PARAM_HEADER
		

		, @_PRIMARY_KEY					int								= NULL		OUTPUT
		, @_VERSION						int								= NULL		OUTPUT

		, @tx_group						varchar(256)					= NULL		
		, @tx_sub_group					varchar(256)					= NULL		
		, @tx_name						varchar(256)					= NULL		
		, @tx_value1					varchar(256)					= NULL		
		, @tx_value2					varchar(256)					= NULL		
		, @tx_value3					varchar(256)					= NULL		
		, @tx_desc						varchar(256)					= NULL		
		, @tx_comment					varchar(256)					= NULL
		, @tx_value_type				varchar(256)					= NULL	
		, @int_include_authorized		int 							= 0
		, @tx_block_nostro				int								= 0	
		, @int_read_only				int 							= NULL
		, @tx_modified_by				varchar(128)					= NULL	

	_SP_PARAM_FOOTER
AS
{
	_SP_SEL_HEADER



		SELECT	tx_rs_type = 'RS_TYPE_CONFIGURATION'
		  	,ET._PRIMARY_KEY			
			,ET._VERSION			
			,ET.tx_group						
			,ET.tx_sub_group					
			,ET.tx_name						
			,ET.tx_value1					
			,ET.tx_value2					
			,ET.tx_value3					
			,ET.tx_desc						
			,ET.tx_comment
			,ET.tx_value_type
			,ET.int_read_only
			,ET.dtt_mod
			,USR.tx_login_name AS tx_modified_by

	FROM	T_CONFIGURATION	ET
	JOIN    T_USER usr ON usr.id_user_key = ET.id_user_mod_key
	WHERE	_PRIMARY_KEY 			= ISNULL(@_PRIMARY_KEY,_PRIMARY_KEY)
	AND 	tx_group		 		= ISNULL(@tx_group		, tx_group)
	AND 	tx_sub_group			= ISNULL(@tx_sub_group	, tx_sub_group)
	AND 	tx_name			 		= ISNULL(@tx_name		, tx_name)
	AND 	tx_value1			 	= ISNULL(@tx_value1		, tx_value1)
	AND		ET.is_active 			= 1

	ORDER BY tx_group ASC, tx_sub_group ASC, tx_name ASC

	_SP_FOOTER

}

go

_GRANT_PERM_SP
