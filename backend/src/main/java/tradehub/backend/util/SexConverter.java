package tradehub.backend.util;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import tradehub.backend.model.util.Sex;

@Converter(autoApply = true)
public class SexConverter implements AttributeConverter<Sex, Integer> {

    @Override
    public Integer convertToDatabaseColumn(Sex sex) {
        return sex != null ? sex.getCode() : null;
    }

    @Override
    public Sex convertToEntityAttribute(Integer code) {
        return code != null ? Sex.fromCode(code) : null;
    }
}
