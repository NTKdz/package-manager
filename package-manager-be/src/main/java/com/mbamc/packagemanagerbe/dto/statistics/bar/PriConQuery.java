package com.mbamc.packagemanagerbe.dto.statistics.bar;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PriConQuery<T extends Enum<?>> {
    public Date date;
    public T label;
    public Long value;
}
