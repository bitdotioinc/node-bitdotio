declare const CreateDbV2BetaDbPost: {
  readonly body: {
    readonly title: 'CreateDatabase';
    readonly required: readonly ['name'];
    readonly type: 'object';
    readonly properties: {
      readonly name: {
        readonly title: 'Name';
        readonly type: 'string';
      };
      readonly is_private: {
        readonly title: 'Is Private';
        readonly type: 'boolean';
        readonly default: true;
      };
      readonly storage_limit_bytes: {
        readonly title: 'Storage Limit Bytes';
        readonly type: 'integer';
      };
    };
    readonly $schema: 'http://json-schema.org/draft-04/schema#';
  };
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly authorization: {
            readonly title: 'Authorization';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly [];
      }
    ];
  };
  readonly response: {
    readonly '201': {
      readonly title: 'Database';
      readonly required: readonly [
        'id',
        'name',
        'date_created',
        'is_private',
        'role',
        'storage_limit_bytes',
        'usage_current',
        'usage_previous'
      ];
      readonly type: 'object';
      readonly properties: {
        readonly id: {
          readonly title: 'Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly name: {
          readonly title: 'Name';
          readonly type: 'string';
        };
        readonly date_created: {
          readonly title: 'Date Created';
          readonly type: 'string';
          readonly format: 'date-time';
        };
        readonly is_private: {
          readonly title: 'Is Private';
          readonly type: 'boolean';
        };
        readonly role: {
          readonly title: 'Role';
          readonly type: 'string';
        };
        readonly storage_limit_bytes: {
          readonly title: 'Storage Limit Bytes';
          readonly type: 'integer';
        };
        readonly storage_usage_bytes: {
          readonly title: 'Storage Usage Bytes';
          readonly type: 'integer';
        };
        readonly usage_current: {
          readonly title: 'DatabaseUsage';
          readonly required: readonly ['rows_queried', 'period_start', 'period_end'];
          readonly type: 'object';
          readonly properties: {
            readonly rows_queried: {
              readonly title: 'Rows Queried';
              readonly type: 'integer';
            };
            readonly period_start: {
              readonly title: 'Period Start';
              readonly type: 'string';
              readonly format: 'date';
            };
            readonly period_end: {
              readonly title: 'Period End';
              readonly type: 'string';
              readonly format: 'date';
            };
          };
        };
        readonly usage_previous: {
          readonly title: 'DatabaseUsage';
          readonly required: readonly ['rows_queried', 'period_start', 'period_end'];
          readonly type: 'object';
          readonly properties: {
            readonly rows_queried: {
              readonly title: 'Rows Queried';
              readonly type: 'integer';
            };
            readonly period_start: {
              readonly title: 'Period Start';
              readonly type: 'string';
              readonly format: 'date';
            };
            readonly period_end: {
              readonly title: 'Period End';
              readonly type: 'string';
              readonly format: 'date';
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '400': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '401': {
      readonly title: 'CustomError';
      readonly required: readonly ['detail', 'uuid'];
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'string';
        };
        readonly uuid: {
          readonly title: 'Uuid';
          readonly type: 'string';
          readonly format: 'uuid';
        };
      };
      readonly description: 'Response data for generic API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '403': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '409': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '422': {
      readonly title: 'HTTPValidationError';
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'array';
          readonly items: {
            readonly title: 'ValidationError';
            readonly required: readonly ['loc', 'msg', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly loc: {
                readonly title: 'Location';
                readonly type: 'array';
                readonly items: {
                  readonly type: 'string';
                };
              };
              readonly msg: {
                readonly title: 'Message';
                readonly type: 'string';
              };
              readonly type: {
                readonly title: 'Error Type';
                readonly type: 'string';
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const CreateExportV2BetaDbUsernameDbNameExportPost: {
  readonly body: {
    readonly title: 'CreateExport';
    readonly required: readonly ['export_format'];
    readonly type: 'object';
    readonly properties: {
      readonly query_string: {
        readonly title: 'Query String';
        readonly type: 'string';
      };
      readonly schema_name: {
        readonly title: 'Schema Name';
        readonly type: 'string';
      };
      readonly table_name: {
        readonly title: 'Table Name';
        readonly type: 'string';
      };
      readonly file_name: {
        readonly title: 'File Name';
        readonly type: 'string';
      };
      readonly export_format: {
        readonly title: 'Export Format';
        readonly enum: readonly ['csv', 'json', 'xls', 'parquet'];
        readonly type: 'string';
      };
    };
    readonly $schema: 'http://json-schema.org/draft-04/schema#';
  };
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly username: {
            readonly title: 'Username';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
          readonly db_name: {
            readonly title: 'Db Name';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly ['username', 'db_name'];
      },
      {
        readonly type: 'object';
        readonly properties: {
          readonly authorization: {
            readonly title: 'Authorization';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly [];
      }
    ];
  };
  readonly response: {
    readonly '201': {
      readonly title: 'ExportJob';
      readonly required: readonly ['id', 'date_created', 'state', 'retries', 'export_format'];
      readonly type: 'object';
      readonly properties: {
        readonly id: {
          readonly title: 'Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly date_created: {
          readonly title: 'Date Created';
          readonly type: 'string';
          readonly format: 'date-time';
        };
        readonly date_finished: {
          readonly title: 'Date Finished';
          readonly type: 'string';
          readonly format: 'date-time';
        };
        readonly state: {
          readonly title: 'State';
          readonly type: 'string';
        };
        readonly retries: {
          readonly title: 'Retries';
          readonly type: 'integer';
        };
        readonly error_type: {
          readonly title: 'Error Type';
          readonly type: 'string';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
        };
        readonly status_url: {
          readonly title: 'Status Url';
          readonly type: 'string';
        };
        readonly export_format: {
          readonly title: 'Export Format';
          readonly type: 'string';
        };
        readonly file_name: {
          readonly title: 'File Name';
          readonly type: 'string';
        };
        readonly download_url: {
          readonly title: 'Download Url';
          readonly maxLength: 2083;
          readonly minLength: 1;
          readonly type: 'string';
          readonly format: 'uri';
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '400': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '401': {
      readonly title: 'CustomError';
      readonly required: readonly ['detail', 'uuid'];
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'string';
        };
        readonly uuid: {
          readonly title: 'Uuid';
          readonly type: 'string';
          readonly format: 'uuid';
        };
      };
      readonly description: 'Response data for generic API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '403': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '422': {
      readonly title: 'HTTPValidationError';
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'array';
          readonly items: {
            readonly title: 'ValidationError';
            readonly required: readonly ['loc', 'msg', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly loc: {
                readonly title: 'Location';
                readonly type: 'array';
                readonly items: {
                  readonly type: 'string';
                };
              };
              readonly msg: {
                readonly title: 'Message';
                readonly type: 'string';
              };
              readonly type: {
                readonly title: 'Error Type';
                readonly type: 'string';
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const CreateImportV2BetaDbUsernameDbNameImportPost: {
  readonly body: {
    readonly title: 'CreateImport';
    readonly required: readonly ['table_name'];
    readonly type: 'object';
    readonly properties: {
      readonly schema_name: {
        readonly title: 'Schema Name';
        readonly type: 'string';
        readonly default: 'public';
      };
      readonly table_name: {
        readonly title: 'Table Name';
        readonly type: 'string';
      };
      readonly infer_header: {
        readonly title: 'Infer Header';
        readonly pattern: '(auto)|(first_row)|(no_header)';
        readonly type: 'string';
        readonly default: 'auto';
      };
      readonly file: {
        readonly title: 'File';
        readonly type: 'string';
        readonly format: 'binary';
      };
      readonly file_url: {
        readonly title: 'File Url';
        readonly type: 'string';
      };
    };
    readonly $schema: 'http://json-schema.org/draft-04/schema#';
  };
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly username: {
            readonly title: 'Username';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
          readonly db_name: {
            readonly title: 'Db Name';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly ['username', 'db_name'];
      },
      {
        readonly type: 'object';
        readonly properties: {
          readonly authorization: {
            readonly title: 'Authorization';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
          readonly 'content-length': {
            readonly title: 'Content-Length';
            readonly type: 'integer';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly ['content-length'];
      }
    ];
  };
  readonly response: {
    readonly '201': {
      readonly title: 'ImportJob';
      readonly required: readonly ['id', 'date_created', 'state', 'retries'];
      readonly type: 'object';
      readonly properties: {
        readonly id: {
          readonly title: 'Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly date_created: {
          readonly title: 'Date Created';
          readonly type: 'string';
          readonly format: 'date-time';
        };
        readonly date_finished: {
          readonly title: 'Date Finished';
          readonly type: 'string';
          readonly format: 'date-time';
        };
        readonly state: {
          readonly title: 'State';
          readonly type: 'string';
        };
        readonly retries: {
          readonly title: 'Retries';
          readonly type: 'integer';
        };
        readonly error_type: {
          readonly title: 'Error Type';
          readonly type: 'string';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly error_details: {
          readonly title: 'Error Details';
          readonly type: 'object';
          readonly additionalProperties: true;
        };
        readonly status_url: {
          readonly title: 'Status Url';
          readonly type: 'string';
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '400': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '401': {
      readonly title: 'CustomError';
      readonly required: readonly ['detail', 'uuid'];
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'string';
        };
        readonly uuid: {
          readonly title: 'Uuid';
          readonly type: 'string';
          readonly format: 'uuid';
        };
      };
      readonly description: 'Response data for generic API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '403': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '422': {
      readonly title: 'HTTPValidationError';
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'array';
          readonly items: {
            readonly title: 'ValidationError';
            readonly required: readonly ['loc', 'msg', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly loc: {
                readonly title: 'Location';
                readonly type: 'array';
                readonly items: {
                  readonly type: 'string';
                };
              };
              readonly msg: {
                readonly title: 'Message';
                readonly type: 'string';
              };
              readonly type: {
                readonly title: 'Error Type';
                readonly type: 'string';
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const DeleteDbV2BetaDbUsernameDbNameDelete: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly username: {
            readonly title: 'Username';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
          readonly db_name: {
            readonly title: 'Db Name';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly ['username', 'db_name'];
      },
      {
        readonly type: 'object';
        readonly properties: {
          readonly authorization: {
            readonly title: 'Authorization';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly [];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly title: 'Database';
      readonly required: readonly [
        'id',
        'name',
        'date_created',
        'is_private',
        'role',
        'storage_limit_bytes',
        'usage_current',
        'usage_previous'
      ];
      readonly type: 'object';
      readonly properties: {
        readonly id: {
          readonly title: 'Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly name: {
          readonly title: 'Name';
          readonly type: 'string';
        };
        readonly date_created: {
          readonly title: 'Date Created';
          readonly type: 'string';
          readonly format: 'date-time';
        };
        readonly is_private: {
          readonly title: 'Is Private';
          readonly type: 'boolean';
        };
        readonly role: {
          readonly title: 'Role';
          readonly type: 'string';
        };
        readonly storage_limit_bytes: {
          readonly title: 'Storage Limit Bytes';
          readonly type: 'integer';
        };
        readonly storage_usage_bytes: {
          readonly title: 'Storage Usage Bytes';
          readonly type: 'integer';
        };
        readonly usage_current: {
          readonly title: 'DatabaseUsage';
          readonly required: readonly ['rows_queried', 'period_start', 'period_end'];
          readonly type: 'object';
          readonly properties: {
            readonly rows_queried: {
              readonly title: 'Rows Queried';
              readonly type: 'integer';
            };
            readonly period_start: {
              readonly title: 'Period Start';
              readonly type: 'string';
              readonly format: 'date';
            };
            readonly period_end: {
              readonly title: 'Period End';
              readonly type: 'string';
              readonly format: 'date';
            };
          };
        };
        readonly usage_previous: {
          readonly title: 'DatabaseUsage';
          readonly required: readonly ['rows_queried', 'period_start', 'period_end'];
          readonly type: 'object';
          readonly properties: {
            readonly rows_queried: {
              readonly title: 'Rows Queried';
              readonly type: 'integer';
            };
            readonly period_start: {
              readonly title: 'Period Start';
              readonly type: 'string';
              readonly format: 'date';
            };
            readonly period_end: {
              readonly title: 'Period End';
              readonly type: 'string';
              readonly format: 'date';
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '401': {
      readonly title: 'CustomError';
      readonly required: readonly ['detail', 'uuid'];
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'string';
        };
        readonly uuid: {
          readonly title: 'Uuid';
          readonly type: 'string';
          readonly format: 'uuid';
        };
      };
      readonly description: 'Response data for generic API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '403': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '422': {
      readonly title: 'HTTPValidationError';
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'array';
          readonly items: {
            readonly title: 'ValidationError';
            readonly required: readonly ['loc', 'msg', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly loc: {
                readonly title: 'Location';
                readonly type: 'array';
                readonly items: {
                  readonly type: 'string';
                };
              };
              readonly msg: {
                readonly title: 'Message';
                readonly type: 'string';
              };
              readonly type: {
                readonly title: 'Error Type';
                readonly type: 'string';
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const GetDbListV2BetaDbGet: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly authorization: {
            readonly title: 'Authorization';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly [];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly title: 'DatabasesResponse';
      readonly required: readonly ['databases'];
      readonly type: 'object';
      readonly properties: {
        readonly databases: {
          readonly title: 'Databases';
          readonly type: 'array';
          readonly items: {
            readonly title: 'Database';
            readonly required: readonly [
              'id',
              'name',
              'date_created',
              'is_private',
              'role',
              'storage_limit_bytes',
              'usage_current',
              'usage_previous'
            ];
            readonly type: 'object';
            readonly properties: {
              readonly id: {
                readonly title: 'Id';
                readonly type: 'string';
                readonly format: 'uuid';
              };
              readonly name: {
                readonly title: 'Name';
                readonly type: 'string';
              };
              readonly date_created: {
                readonly title: 'Date Created';
                readonly type: 'string';
                readonly format: 'date-time';
              };
              readonly is_private: {
                readonly title: 'Is Private';
                readonly type: 'boolean';
              };
              readonly role: {
                readonly title: 'Role';
                readonly type: 'string';
              };
              readonly storage_limit_bytes: {
                readonly title: 'Storage Limit Bytes';
                readonly type: 'integer';
              };
              readonly storage_usage_bytes: {
                readonly title: 'Storage Usage Bytes';
                readonly type: 'integer';
              };
              readonly usage_current: {
                readonly title: 'DatabaseUsage';
                readonly required: readonly ['rows_queried', 'period_start', 'period_end'];
                readonly type: 'object';
                readonly properties: {
                  readonly rows_queried: {
                    readonly title: 'Rows Queried';
                    readonly type: 'integer';
                  };
                  readonly period_start: {
                    readonly title: 'Period Start';
                    readonly type: 'string';
                    readonly format: 'date';
                  };
                  readonly period_end: {
                    readonly title: 'Period End';
                    readonly type: 'string';
                    readonly format: 'date';
                  };
                };
              };
              readonly usage_previous: {
                readonly title: 'DatabaseUsage';
                readonly required: readonly ['rows_queried', 'period_start', 'period_end'];
                readonly type: 'object';
                readonly properties: {
                  readonly rows_queried: {
                    readonly title: 'Rows Queried';
                    readonly type: 'integer';
                  };
                  readonly period_start: {
                    readonly title: 'Period Start';
                    readonly type: 'string';
                    readonly format: 'date';
                  };
                  readonly period_end: {
                    readonly title: 'Period End';
                    readonly type: 'string';
                    readonly format: 'date';
                  };
                };
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '401': {
      readonly title: 'CustomError';
      readonly required: readonly ['detail', 'uuid'];
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'string';
        };
        readonly uuid: {
          readonly title: 'Uuid';
          readonly type: 'string';
          readonly format: 'uuid';
        };
      };
      readonly description: 'Response data for generic API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '422': {
      readonly title: 'HTTPValidationError';
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'array';
          readonly items: {
            readonly title: 'ValidationError';
            readonly required: readonly ['loc', 'msg', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly loc: {
                readonly title: 'Location';
                readonly type: 'array';
                readonly items: {
                  readonly type: 'string';
                };
              };
              readonly msg: {
                readonly title: 'Message';
                readonly type: 'string';
              };
              readonly type: {
                readonly title: 'Error Type';
                readonly type: 'string';
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const GetDbV2BetaDbUsernameDbNameGet: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly username: {
            readonly title: 'Username';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
          readonly db_name: {
            readonly title: 'Db Name';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly ['username', 'db_name'];
      },
      {
        readonly type: 'object';
        readonly properties: {
          readonly authorization: {
            readonly title: 'Authorization';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly [];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly title: 'Database';
      readonly required: readonly [
        'id',
        'name',
        'date_created',
        'is_private',
        'role',
        'storage_limit_bytes',
        'usage_current',
        'usage_previous'
      ];
      readonly type: 'object';
      readonly properties: {
        readonly id: {
          readonly title: 'Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly name: {
          readonly title: 'Name';
          readonly type: 'string';
        };
        readonly date_created: {
          readonly title: 'Date Created';
          readonly type: 'string';
          readonly format: 'date-time';
        };
        readonly is_private: {
          readonly title: 'Is Private';
          readonly type: 'boolean';
        };
        readonly role: {
          readonly title: 'Role';
          readonly type: 'string';
        };
        readonly storage_limit_bytes: {
          readonly title: 'Storage Limit Bytes';
          readonly type: 'integer';
        };
        readonly storage_usage_bytes: {
          readonly title: 'Storage Usage Bytes';
          readonly type: 'integer';
        };
        readonly usage_current: {
          readonly title: 'DatabaseUsage';
          readonly required: readonly ['rows_queried', 'period_start', 'period_end'];
          readonly type: 'object';
          readonly properties: {
            readonly rows_queried: {
              readonly title: 'Rows Queried';
              readonly type: 'integer';
            };
            readonly period_start: {
              readonly title: 'Period Start';
              readonly type: 'string';
              readonly format: 'date';
            };
            readonly period_end: {
              readonly title: 'Period End';
              readonly type: 'string';
              readonly format: 'date';
            };
          };
        };
        readonly usage_previous: {
          readonly title: 'DatabaseUsage';
          readonly required: readonly ['rows_queried', 'period_start', 'period_end'];
          readonly type: 'object';
          readonly properties: {
            readonly rows_queried: {
              readonly title: 'Rows Queried';
              readonly type: 'integer';
            };
            readonly period_start: {
              readonly title: 'Period Start';
              readonly type: 'string';
              readonly format: 'date';
            };
            readonly period_end: {
              readonly title: 'Period End';
              readonly type: 'string';
              readonly format: 'date';
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '401': {
      readonly title: 'CustomError';
      readonly required: readonly ['detail', 'uuid'];
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'string';
        };
        readonly uuid: {
          readonly title: 'Uuid';
          readonly type: 'string';
          readonly format: 'uuid';
        };
      };
      readonly description: 'Response data for generic API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '422': {
      readonly title: 'HTTPValidationError';
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'array';
          readonly items: {
            readonly title: 'ValidationError';
            readonly required: readonly ['loc', 'msg', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly loc: {
                readonly title: 'Location';
                readonly type: 'array';
                readonly items: {
                  readonly type: 'string';
                };
              };
              readonly msg: {
                readonly title: 'Message';
                readonly type: 'string';
              };
              readonly type: {
                readonly title: 'Error Type';
                readonly type: 'string';
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const GetExportV2BetaExportExportIdGet: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly export_id: {
            readonly title: 'Export Id';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly ['export_id'];
      },
      {
        readonly type: 'object';
        readonly properties: {
          readonly authorization: {
            readonly title: 'Authorization';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly [];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly title: 'ExportJob';
      readonly required: readonly ['id', 'date_created', 'state', 'retries', 'export_format'];
      readonly type: 'object';
      readonly properties: {
        readonly id: {
          readonly title: 'Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly date_created: {
          readonly title: 'Date Created';
          readonly type: 'string';
          readonly format: 'date-time';
        };
        readonly date_finished: {
          readonly title: 'Date Finished';
          readonly type: 'string';
          readonly format: 'date-time';
        };
        readonly state: {
          readonly title: 'State';
          readonly type: 'string';
        };
        readonly retries: {
          readonly title: 'Retries';
          readonly type: 'integer';
        };
        readonly error_type: {
          readonly title: 'Error Type';
          readonly type: 'string';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
        };
        readonly status_url: {
          readonly title: 'Status Url';
          readonly type: 'string';
        };
        readonly export_format: {
          readonly title: 'Export Format';
          readonly type: 'string';
        };
        readonly file_name: {
          readonly title: 'File Name';
          readonly type: 'string';
        };
        readonly download_url: {
          readonly title: 'Download Url';
          readonly maxLength: 2083;
          readonly minLength: 1;
          readonly type: 'string';
          readonly format: 'uri';
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '401': {
      readonly title: 'CustomError';
      readonly required: readonly ['detail', 'uuid'];
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'string';
        };
        readonly uuid: {
          readonly title: 'Uuid';
          readonly type: 'string';
          readonly format: 'uuid';
        };
      };
      readonly description: 'Response data for generic API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '422': {
      readonly title: 'HTTPValidationError';
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'array';
          readonly items: {
            readonly title: 'ValidationError';
            readonly required: readonly ['loc', 'msg', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly loc: {
                readonly title: 'Location';
                readonly type: 'array';
                readonly items: {
                  readonly type: 'string';
                };
              };
              readonly msg: {
                readonly title: 'Message';
                readonly type: 'string';
              };
              readonly type: {
                readonly title: 'Error Type';
                readonly type: 'string';
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const GetImportV2BetaImportImportIdGet: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly import_id: {
            readonly title: 'Import Id';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly ['import_id'];
      },
      {
        readonly type: 'object';
        readonly properties: {
          readonly authorization: {
            readonly title: 'Authorization';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly [];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly title: 'ImportJob';
      readonly required: readonly ['id', 'date_created', 'state', 'retries'];
      readonly type: 'object';
      readonly properties: {
        readonly id: {
          readonly title: 'Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly date_created: {
          readonly title: 'Date Created';
          readonly type: 'string';
          readonly format: 'date-time';
        };
        readonly date_finished: {
          readonly title: 'Date Finished';
          readonly type: 'string';
          readonly format: 'date-time';
        };
        readonly state: {
          readonly title: 'State';
          readonly type: 'string';
        };
        readonly retries: {
          readonly title: 'Retries';
          readonly type: 'integer';
        };
        readonly error_type: {
          readonly title: 'Error Type';
          readonly type: 'string';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly error_details: {
          readonly title: 'Error Details';
          readonly type: 'object';
          readonly additionalProperties: true;
        };
        readonly status_url: {
          readonly title: 'Status Url';
          readonly type: 'string';
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '401': {
      readonly title: 'CustomError';
      readonly required: readonly ['detail', 'uuid'];
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'string';
        };
        readonly uuid: {
          readonly title: 'Uuid';
          readonly type: 'string';
          readonly format: 'uuid';
        };
      };
      readonly description: 'Response data for generic API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '422': {
      readonly title: 'HTTPValidationError';
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'array';
          readonly items: {
            readonly title: 'ValidationError';
            readonly required: readonly ['loc', 'msg', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly loc: {
                readonly title: 'Location';
                readonly type: 'array';
                readonly items: {
                  readonly type: 'string';
                };
              };
              readonly msg: {
                readonly title: 'Message';
                readonly type: 'string';
              };
              readonly type: {
                readonly title: 'Error Type';
                readonly type: 'string';
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const QueryV2BetaQueryPost: {
  readonly body: {
    readonly title: 'QueryRequest';
    readonly required: readonly ['query_string', 'database_name'];
    readonly type: 'object';
    readonly properties: {
      readonly query_string: {
        readonly title: 'Query String';
        readonly type: 'string';
      };
      readonly database_name: {
        readonly title: 'Database Name';
        readonly type: 'string';
      };
    };
    readonly $schema: 'http://json-schema.org/draft-04/schema#';
  };
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly data_format: {
            readonly title: 'Data Format';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly [];
      },
      {
        readonly type: 'object';
        readonly properties: {
          readonly authorization: {
            readonly title: 'Authorization';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly [];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '422': {
      readonly title: 'HTTPValidationError';
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'array';
          readonly items: {
            readonly title: 'ValidationError';
            readonly required: readonly ['loc', 'msg', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly loc: {
                readonly title: 'Location';
                readonly type: 'array';
                readonly items: {
                  readonly type: 'string';
                };
              };
              readonly msg: {
                readonly title: 'Message';
                readonly type: 'string';
              };
              readonly type: {
                readonly title: 'Error Type';
                readonly type: 'string';
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
declare const UpdateDbV2BetaDbUsernameDbNamePatch: {
  readonly body: {
    readonly title: 'UpdateDatabase';
    readonly type: 'object';
    readonly properties: {
      readonly name: {
        readonly title: 'Name';
        readonly type: 'string';
      };
      readonly is_private: {
        readonly title: 'Is Private';
        readonly type: 'boolean';
      };
      readonly storage_limit_bytes: {
        readonly title: 'Storage Limit Bytes';
        readonly type: 'integer';
      };
    };
    readonly $schema: 'http://json-schema.org/draft-04/schema#';
  };
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly username: {
            readonly title: 'Username';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
          readonly db_name: {
            readonly title: 'Db Name';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly ['username', 'db_name'];
      },
      {
        readonly type: 'object';
        readonly properties: {
          readonly authorization: {
            readonly title: 'Authorization';
            readonly type: 'string';
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
          };
        };
        readonly required: readonly [];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly title: 'Database';
      readonly required: readonly [
        'id',
        'name',
        'date_created',
        'is_private',
        'role',
        'storage_limit_bytes',
        'usage_current',
        'usage_previous'
      ];
      readonly type: 'object';
      readonly properties: {
        readonly id: {
          readonly title: 'Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly name: {
          readonly title: 'Name';
          readonly type: 'string';
        };
        readonly date_created: {
          readonly title: 'Date Created';
          readonly type: 'string';
          readonly format: 'date-time';
        };
        readonly is_private: {
          readonly title: 'Is Private';
          readonly type: 'boolean';
        };
        readonly role: {
          readonly title: 'Role';
          readonly type: 'string';
        };
        readonly storage_limit_bytes: {
          readonly title: 'Storage Limit Bytes';
          readonly type: 'integer';
        };
        readonly storage_usage_bytes: {
          readonly title: 'Storage Usage Bytes';
          readonly type: 'integer';
        };
        readonly usage_current: {
          readonly title: 'DatabaseUsage';
          readonly required: readonly ['rows_queried', 'period_start', 'period_end'];
          readonly type: 'object';
          readonly properties: {
            readonly rows_queried: {
              readonly title: 'Rows Queried';
              readonly type: 'integer';
            };
            readonly period_start: {
              readonly title: 'Period Start';
              readonly type: 'string';
              readonly format: 'date';
            };
            readonly period_end: {
              readonly title: 'Period End';
              readonly type: 'string';
              readonly format: 'date';
            };
          };
        };
        readonly usage_previous: {
          readonly title: 'DatabaseUsage';
          readonly required: readonly ['rows_queried', 'period_start', 'period_end'];
          readonly type: 'object';
          readonly properties: {
            readonly rows_queried: {
              readonly title: 'Rows Queried';
              readonly type: 'integer';
            };
            readonly period_start: {
              readonly title: 'Period Start';
              readonly type: 'string';
              readonly format: 'date';
            };
            readonly period_end: {
              readonly title: 'Period End';
              readonly type: 'string';
              readonly format: 'date';
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '400': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '401': {
      readonly title: 'CustomError';
      readonly required: readonly ['detail', 'uuid'];
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'string';
        };
        readonly uuid: {
          readonly title: 'Uuid';
          readonly type: 'string';
          readonly format: 'uuid';
        };
      };
      readonly description: 'Response data for generic API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '403': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '404': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '409': {
      readonly title: 'DjangoApiError';
      readonly required: readonly ['status_code', 'error_id'];
      readonly type: 'object';
      readonly properties: {
        readonly status_code: {
          readonly title: 'Status Code';
          readonly type: 'integer';
        };
        readonly error_id: {
          readonly title: 'Error Id';
          readonly type: 'string';
          readonly format: 'uuid';
        };
        readonly message: {
          readonly title: 'Message';
          readonly type: 'string';
        };
        readonly help: {
          readonly title: 'Help';
          readonly type: 'string';
        };
        readonly error: {
          readonly title: 'DjangoError';
          readonly required: readonly ['type'];
          readonly type: 'object';
          readonly properties: {
            readonly type: {
              readonly title: 'Type';
              readonly type: 'string';
            };
          };
        };
      };
      readonly description: 'Response data for Django API errors';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly '422': {
      readonly title: 'HTTPValidationError';
      readonly type: 'object';
      readonly properties: {
        readonly detail: {
          readonly title: 'Detail';
          readonly type: 'array';
          readonly items: {
            readonly title: 'ValidationError';
            readonly required: readonly ['loc', 'msg', 'type'];
            readonly type: 'object';
            readonly properties: {
              readonly loc: {
                readonly title: 'Location';
                readonly type: 'array';
                readonly items: {
                  readonly type: 'string';
                };
              };
              readonly msg: {
                readonly title: 'Message';
                readonly type: 'string';
              };
              readonly type: {
                readonly title: 'Error Type';
                readonly type: 'string';
              };
            };
          };
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
export {
  CreateDbV2BetaDbPost,
  CreateExportV2BetaDbUsernameDbNameExportPost,
  CreateImportV2BetaDbUsernameDbNameImportPost,
  DeleteDbV2BetaDbUsernameDbNameDelete,
  GetDbListV2BetaDbGet,
  GetDbV2BetaDbUsernameDbNameGet,
  GetExportV2BetaExportExportIdGet,
  GetImportV2BetaImportImportIdGet,
  QueryV2BetaQueryPost,
  UpdateDbV2BetaDbUsernameDbNamePatch,
};
