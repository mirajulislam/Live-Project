/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul islam
* Date          : 20 OCT 2020
* Description   : Table for Deshboard information
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _TABLE_NAME 		{T_DASHBOARD_DATA};
#define _PRIMARY_KEY		{id_deshboard_data_key };
#define _VERSION			{id_deshboard_data_ver};

_DROP_TABLE

_CREATE_TABLE(_TABLE_NAME )

(
	  _PRIMARY_KEY					 	INT	IDENTITY(100000,1)	NOT NULL
	, _VERSION					  	 	INT				        NOT NULL
	, _TABLE_HEADER_WITH_STATE

	  ,tx_dashboard_type                  VARCHAR(256)  NOT NULL
	  ,tx_date                            VARCHAR(256)  NOT NULL
	  ,int_col_1                          INT           NOT NULL  
	  ,int_col_2                          INT           NOT NULL  
	  ,int_col_3                          INT           NOT NULL  
	  ,int_col_4                          INT           NOT NULL  
	  ,int_col_5                          INT           NOT NULL  
	  ,int_col_6                          INT           NOT NULL  
	  ,int_col_7                          INT           NOT NULL  
	  ,int_col_8                          INT           NOT NULL  
	  ,int_col_9                          INT           NOT NULL  
	  ,int_col_10                          INT           NOT NULL  
	  ,int_col_11                          INT           NOT NULL  
	  ,int_col_12                          INT           NOT NULL  
	  ,int_col_13                          INT           NOT NULL  
	  ,int_col_14                          INT           NOT NULL  
	  ,int_col_15                          INT           NOT NULL  
	  ,int_col_16                          INT           NOT NULL  
	  ,int_col_17                          INT           NOT NULL  
	  ,int_col_18                          INT           NOT NULL  
	  ,int_col_19                          INT           NOT NULL  
	  ,int_col_20                          INT           NOT NULL  
	  ,int_col_21                         INT           NOT NULL  
	  ,int_col_22                          INT           NOT NULL  
	  ,int_col_23                          INT           NOT NULL 
	  ,int_col_24                          INT           NOT NULL  
	  ,int_col_25                          INT           NOT NULL  
	  ,int_col_26                          INT           NOT NULL  
	  ,int_col_27                          INT           NOT NULL  
	  ,int_col_28                          INT           NOT NULL  
	  ,int_col_29                          INT           NOT NULL  
	  ,int_col_30                          INT           NOT NULL  
	  ,int_col_31                          INT           NOT NULL  
	  ,int_col_32                          INT           NOT NULL  
	  ,int_col_33                          INT           NOT NULL  
	  ,int_col_34                          INT           NOT NULL  
	  ,int_col_35                          INT           NOT NULL  
	  ,int_col_36                          INT           NOT NULL  
	  ,int_col_37                          INT           NOT NULL  
	  ,int_col_38                          INT           NOT NULL  
	  ,int_col_39                          INT           NOT NULL  
	  ,int_col_40                          INT           NOT NULL  
	  ,int_col_41                          INT           NOT NULL  
	  ,int_col_42                          INT           NOT NULL  
	  ,int_col_43                          INT           NOT NULL  
	  ,int_col_44                          INT           NOT NULL  
	  ,int_col_45                          INT           NOT NULL  
	  ,int_col_46                         INT           NOT NULL 
	  ,int_col_47                          INT           NOT NULL  
	  ,int_col_48                          INT           NOT NULL  
	  ,int_col_49                          INT           NOT NULL  
	  ,int_col_50                          INT           NOT NULL  
)

go

_GRANT_PERM_TBL
