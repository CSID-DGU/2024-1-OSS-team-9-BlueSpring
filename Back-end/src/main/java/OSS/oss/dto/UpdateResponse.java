package OSS.oss.dto;

import OSS.oss.entity.User;

public class UpdateResponse {
    private String message;
    private User updatedUser;

    public UpdateResponse(String message, User updatedUser) {
        this.message = message;
        this.updatedUser = updatedUser;
    }
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getUpdatedUser() {
        return updatedUser;
    }

    public void setUpdatedUser(User updatedUser) {
        this.updatedUser = updatedUser;
    }
}
