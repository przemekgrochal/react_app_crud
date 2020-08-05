import React, { useMemo } from 'react';

export const inputNameOption = useMemo(() => {
  return {
    onValueChanged: (e) => {
      setFormData({ name: e.value });
    }
  };
}, []);
