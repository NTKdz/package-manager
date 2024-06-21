package com.mbamc.packagemanagerbe.response;

import java.util.Date;

public interface PriConQueryInterface<T extends Enum<?>> {
    Date getDate();
    String getLabel();
    Long getValue();
}
